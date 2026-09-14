import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const product = String(body.product ?? "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Заполните имя и телефон",
        },
        { status: 400 },
      );
    }

    if (name.length > 100 || phone.length > 50 || product.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Слишком длинные данные",
        },
        { status: 400 },
      );
    }

    await sendTelegramMessage({
      name,
      phone,
      product: product || undefined,
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