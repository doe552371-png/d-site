import sharp from "sharp";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_MODEL = "black-forest-labs/flux-fill-pro";

const TASK_PROMPTS: Record<string, string> = {
  "Молдинги и стеновой декор":
    "decorative wall moulding panels and architectural trim, clean straight lines, realistic painted finish",
  "Плинтусы и примыкания":
    "a matching skirting board (plinth) along the existing floor line, simple profile, realistic painted finish",
  "Панели и фактурные стены":
    "decorative textured wall panels with subtle 3D relief, realistic matte finish",
  "Несколько решений сразу":
    "a coordinated set of decorative wall moulding panels, skirting boards and textured wall panels",
};

const STYLE_PROMPTS: Record<string, string> = {
  "Современный": "clean contemporary style, neutral off-white finish",
  "Минимализм": "minimalist style, simple flat white finish, no ornamentation",
  "Japandi": "Japandi style, warm light wood and soft off-white tones",
  "Soft Classic": "soft classic style, elegant restrained moulding profiles, warm white finish",
};

export type VisualizeParams = {
  imageBuffer: Buffer;
  maskBuffer: Buffer;
  task: string;
  style: string;
};

export type VisualizeResult = {
  imageBuffer: Buffer;
  contentType: "image/jpeg";
};

const EDIT_SIZE = 1024;

async function normalizeToSquarePng(buffer: Buffer) {
  return sharp(buffer)
    .resize(EDIT_SIZE, EDIT_SIZE, { fit: "cover" })
    .png()
    .toBuffer();
}

async function maskToReplicateFormat(maskBuffer: Buffer) {
  const resized = await sharp(maskBuffer)
    .resize(EDIT_SIZE, EDIT_SIZE, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = resized;
  const out = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const painted = data[i] > 80;
    const value = painted ? 255 : 0;

    out[j] = value;
    out[j + 1] = value;
    out[j + 2] = value;
    out[j + 3] = 255;
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

function toDataUri(buffer: Buffer) {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function buildPrompt(task: string, style: string) {
  const taskPhrase =
    TASK_PROMPTS[task] ?? TASK_PROMPTS["Молдинги и стеновой декор"];
  const stylePhrase = STYLE_PROMPTS[style] ?? STYLE_PROMPTS["Современный"];

  return [
    `Add only ${taskPhrase} in the masked area, ${stylePhrase}.`,
    "The new material must be physically attached to the existing wall and follow its exact planes, perspective and proportions.",
    "Preserve everything outside the mask exactly: architecture, ceiling, cornice, chandelier, lighting fixtures, windows, doors, furniture, floor, camera position, perspective, lighting and colors.",
    "Do not add, remove, replace or redesign any object outside the masked area.",
    "Do not invent decorative objects or lighting fixtures.",
    "Photorealistic interior photography. No text. No watermark. No people.",
  ].join(" ");
}

type ReplicatePrediction = {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string | string[] | null;
  error?: string | null;
};

async function replicateRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`https://api.replicate.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Replicate API ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

async function createPrediction(
  image: Buffer,
  mask: Buffer,
  prompt: string,
) {
  return replicateRequest<ReplicatePrediction>(
    `/models/${REPLICATE_MODEL}/predictions`,
    {
      method: "POST",
      body: JSON.stringify({
        input: {
          image: toDataUri(image),
          mask: toDataUri(mask),
          prompt,
          output_format: "jpg",
          safety_tolerance: 2,
          prompt_upsampling: false,
        },
      }),
    },
  );
}

async function waitForPrediction(id: string) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const prediction = await replicateRequest<ReplicatePrediction>(
      `/predictions/${id}`,
    );

    if (prediction.status === "succeeded") return prediction;

    if (
      prediction.status === "failed" ||
      prediction.status === "canceled"
    ) {
      throw new Error(
        prediction.error ?? `Replicate prediction ${prediction.status}`,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error("Replicate prediction timed out");
}

async function downloadOutput(output: string | string[]) {
  const outputUrl = Array.isArray(output) ? output[0] : output;

  if (!outputUrl) {
    throw new Error("Replicate did not return an image");
  }

  const response = await fetch(outputUrl);

  if (!response.ok) {
    throw new Error(`Failed to download Replicate output: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

export async function generateVisualization({
  imageBuffer,
  maskBuffer,
  task,
  style,
}: VisualizeParams): Promise<VisualizeResult> {
  if (!REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN is not configured");
  }

  const [normalizedImage, normalizedMask] = await Promise.all([
    normalizeToSquarePng(imageBuffer),
    maskToReplicateFormat(maskBuffer),
  ]);

  const prediction = await createPrediction(
    normalizedImage,
    normalizedMask,
    buildPrompt(task, style),
  );

  const completed = await waitForPrediction(prediction.id);
  const result = await downloadOutput(completed.output ?? []);

  return {
    imageBuffer: result,
    contentType: "image/jpeg",
  };
}
