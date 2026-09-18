const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

type TelegramMessage = {
  name: string;
  phone: string;
  product?: string;
  message?: string;
};

export async function sendTelegramMessage({
  name,
  phone,
  product,
  message,
}: TelegramMessage) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error("Telegram environment variables are not configured");
  }

  const telegramText = [
    "Новая заявка с сайта",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    product ? `Товар: ${product}` : "",
    message ? `Задача: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramText,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to send Telegram message");
  }
}
