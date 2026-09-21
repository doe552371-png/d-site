import OpenAI from "openai";
import sharp from "sharp";
import { toFile } from "openai/uploads";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const TASK_PROMPTS: Record<string, string> = {
  "Молдинги и стеновой декор":
    "decorative wall moldings and architectural stucco trim, clean straight lines, matte painted finish",
  "Плинтусы и примыкания":
    "a matching skirting board (plinth) along the floor line, simple modern profile, matte painted finish",
  "Панели и фактурные стены":
    "decorative textured wall panels with a subtle 3D relief pattern, matte finish",
  "Несколько решений сразу":
    "a coordinated set of decorative wall moldings, skirting boards and textured wall panels, matte finish",
};

const STYLE_PROMPTS: Record<string, string> = {
  "Современный": "in a clean contemporary style, neutral off-white color",
  "Минимализм": "in a minimalist style, flat white color, no ornamentation",
  "Japandi": "in a Japandi style, warm light wood and soft off-white tones",
  "Soft Classic": "in a soft classic style, gentle profile mouldings, warm white color",
};

export type VisualizeParams = {
  imageBuffer: Buffer;
  maskBuffer: Buffer;
  task: string;
  style: string;
};

export type VisualizeResult = {
  imageBuffer: Buffer;
  contentType: "image/png";
};

function buildPrompt(task: string, style: string) {
  const taskPhrase = TASK_PROMPTS[task] ?? TASK_PROMPTS["Молдинги и стеновой декор"];
  const stylePhrase = STYLE_PROMPTS[style] ?? STYLE_PROMPTS["Современный"];

  return [
    `Add ${taskPhrase}, ${stylePhrase}, only inside the highlighted area of the photo.`,
    "Keep everything outside the highlighted area exactly as in the original photo: same room geometry, same furniture, same lighting, same camera angle, same colors.",
    "Photorealistic interior photo. No text, no watermark, no people.",
  ].join(" ");
}

// OpenAI's images.edit endpoint expects square PNGs up to 4MB for the
// image and a mask of identical dimensions. We normalize both here so the
// result is deterministic regardless of what the user uploaded.
const EDIT_SIZE = 1024;

async function normalizeToSquarePng(buffer: Buffer, background: { r: number; g: number; b: number; alpha: number }) {
  return sharp(buffer)
    .resize(EDIT_SIZE, EDIT_SIZE, { fit: "cover" })
    .png()
    .toBuffer()
    .then((png) =>
      sharp(png)
        .flatten({ background })
        .png()
        .toBuffer(),
    );
}

// The mask arrives as an opaque-black canvas with the user's brush strokes
// painted in white. images.edit needs the inverse: fully transparent where
// the user painted (= "edit here"), fully opaque elsewhere (= "keep this").
async function maskToOpenAiFormat(maskBuffer: Buffer) {
  const resized = await sharp(maskBuffer)
    .resize(EDIT_SIZE, EDIT_SIZE, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = resized;
  const out = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += info.channels) {
    const brightness = data[i];
    const painted = brightness > 80;

    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = painted ? 0 : 255;
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

export async function generateVisualization({
  imageBuffer,
  maskBuffer,
  task,
  style,
}: VisualizeParams): Promise<VisualizeResult> {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const client = new OpenAI({ apiKey: OPENAI_API_KEY });

  const [normalizedImage, normalizedMask] = await Promise.all([
    normalizeToSquarePng(imageBuffer, { r: 255, g: 255, b: 255, alpha: 1 }),
    maskToOpenAiFormat(maskBuffer),
  ]);

  const prompt = buildPrompt(task, style);

  const response = await client.images.edit({
    model: "gpt-image-1",
    image: await toFile(normalizedImage, "room.png", { type: "image/png" }),
    mask: await toFile(normalizedMask, "mask.png", { type: "image/png" }),
    prompt,
    size: "1024x1024",
    n: 1,
  });

  const b64 = response.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error("OpenAI did not return an image");
  }

  return {
    imageBuffer: Buffer.from(b64, "base64"),
    contentType: "image/png",
  };
}
