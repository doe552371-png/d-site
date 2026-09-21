import { NextResponse } from "next/server";
import { generateVisualization } from "@/lib/visualize";

type RateLimitEntry = {
  count: number;
  firstRequestAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 10;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

const ALLOWED_TASKS = new Set([
  "Молдинги и стеновой декор",
  "Плинтусы и примыкания",
  "Панели и фактурные стены",
  "Несколько решений сразу",
]);

const ALLOWED_STYLES = new Set(["Современный", "Минимализм", "Japandi", "Soft Classic"]);

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();

  const entry = rateLimit.get(ip);

  if (!entry || now - entry.firstRequestAt > WINDOW_MS) {
    rateLimit.set(ip, { count: 1, firstRequestAt: now });
  } else {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { success: false, message: "Слишком много запросов. Попробуйте позже." },
        { status: 429 },
      );
    }
    entry.count += 1;
  }

  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const mask = formData.get("mask");
    const task = String(formData.get("task") ?? "");
    const style = String(formData.get("style") ?? "");

    if (!(image instanceof File) || !(mask instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Не хватает фото или выделенной области" },
        { status: 400 },
      );
    }

    if (image.size > MAX_FILE_BYTES || mask.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { success: false, message: "Файл слишком большой (максимум 8 МБ)" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TASKS.has(task) || !ALLOWED_STYLES.has(style)) {
      return NextResponse.json(
        { success: false, message: "Некорректные параметры задачи" },
        { status: 400 },
      );
    }

    const [imageBuffer, maskBuffer] = await Promise.all([
      image.arrayBuffer().then(Buffer.from),
      mask.arrayBuffer().then(Buffer.from),
    ]);

    const result = await generateVisualization({
      imageBuffer,
      maskBuffer,
      task,
      style,
    });

    return NextResponse.json({
      success: true,
      image: `data:${result.contentType};base64,${result.imageBuffer.toString("base64")}`,
    });
  } catch (error) {
    console.error("[/api/visualize] generation failed:", error);

    return NextResponse.json(
      { success: false, message: "Не удалось сгенерировать визуализацию. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}
