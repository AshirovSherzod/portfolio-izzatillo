/**
 * Contact va Brief formalarining xabarlarini Telegram'ga uzatadigan
 * serverless funksiya.
 *
 * Bot tokeni ataylab shu yerda — server tomonida — turadi. Ilgari u
 * `VITE_TELEGRAM_BOT_TOKEN` nomi bilan brauzer bundle'iga yozilardi, ya'ni
 * uni saytga kirgan har kim DevTools orqali o'qiy olardi. Endi brauzer
 * tokenni umuman ko'rmaydi: u faqat shu endpoint'ga POST qiladi.
 *
 * Shuning uchun muhit o'zgaruvchilari `VITE_` prefiksisiz nomlanadi —
 * prefiks qo'shilsa, Vite ularni yana bundle ichiga qaytarib yozadi.
 */
export const config = { runtime: "edge" };

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/** Telegram bitta xabarda 4096 belgidan ortig'ini qabul qilmaydi */
const MAX_LENGTH = 4096;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Faqat POST" }, 405);
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(
      "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID o'rnatilmagan — xabar yuborilmadi",
    );
    return json({ error: "Server sozlanmagan" }, 500);
  }

  let payload: { text?: unknown };
  try {
    payload = (await request.json()) as { text?: unknown };
  } catch {
    return json({ error: "Noto'g'ri JSON" }, 400);
  }

  const { text } = payload;

  if (typeof text !== "string" || !text.trim()) {
    return json({ error: "Matn bo'sh" }, 400);
  }

  if (text.length > MAX_LENGTH) {
    return json({ error: "Matn juda uzun" }, 413);
  }

  /*
   * `parse_mode` ataylab berilmagan: foydalanuvchi matnidagi `<` yoki `&`
   * kabi belgilar Telegram'ning HTML tahlilini buzib, yuborishni yiqitardi.
   */
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    },
  );

  if (!response.ok) {
    /*
     * Telegram'ning javob matni so'ralgan URL'ni, u bilan birga tokenni ham
     * o'z ichiga olishi mumkin — shuning uchun u faqat logga yoziladi,
     * mijozga esa umumiy xato qaytariladi.
     */
    console.error("Telegram API xatosi:", response.status, await response.text());
    return json({ error: "Yuborib bo'lmadi" }, 502);
  }

  return json({ ok: true }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
