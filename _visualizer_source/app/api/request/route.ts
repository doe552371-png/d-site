import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

type RateLimitEntry = {
  count: number;
  firstRequestAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  return digits.length >= 10 && digits.length <= 15;
}

function isValidName(name: string) {
  return /^[\p{L}\s'-]{2,100}$/u.test(name);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const now = Date.now();

    const entry = rateLimit.get(ip);

    if (!entry || now - entry.firstRequestAt > WINDOW_MS) {
      rateLimit.set(ip, {
        count: 1,
        firstRequestAt: now,
      });
    } else {
      if (entry.count >= MAX_REQUESTS) {
        return NextResponse.json(
          {
            success: false,
            message: "Слишком много запросов. Попробуйте позже.",
          },
          { status: 429 },
        );
      }

      entry.count += 1;
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const product = String(body.product ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? "").trim();

    if (website) {
      return NextResponse.json(
        {
          success: false,
          message: "Не удалось отправить заявку",
        },
        { status: 400 },
      );
    }

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Заполните имя и телефон",
        },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      phone.length > 50 ||
      product.length > 200 ||
      message.length > 2000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Слишком длинные данные",
        },
        { status: 400 },
      );
    }

    if (!isValidName(name)) {
      return NextResponse.json(
        {
          success: false,
          message: "Проверьте имя",
        },
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Проверьте номер телефона",
        },
        { status: 400 },
      );
    }

    await sendTelegramMessage({
      name,
      phone,
      product: product || undefined,
      message: message || undefined,
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Не удалось отправить заявку",
      },
      { status: 500 },
    );
  }
}