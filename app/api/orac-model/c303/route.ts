const MODEL_URL =
  "https://global.oracdecor.ru/assets/download/file/asset/C303_border/file/file_4/";

export async function GET() {
  try {
    const response = await fetch(MODEL_URL);

    if (!response.ok) {
      return new Response("Failed to fetch Orac C303 model", {
        status: response.status,
      });
    }

    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/octet-stream",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Failed to fetch Orac C303 model", {
      status: 502,
    });
  }
}
