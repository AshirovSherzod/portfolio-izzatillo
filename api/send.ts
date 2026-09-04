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

/** Telegram bitta xabarda 4096 belgidan ortig'ini qabul qilmaydi */
const MAX_LENGTH = 4096;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Faqat POST" }, 405);
  }

  /*
   * Qiymatlar ataylab modul darajasida emas, shu yerda o'qiladi. Modul
   * tanasi sovuq startda bir marta ishlaydi va ba'zi muhitlarda qiymatlar
   * o'sha paytda "muzlab" qoladi — o'zgaruvchini keyin qo'shsangiz funksiya
   * uni ko'rmay qolardi. Har so'rovda o'qish buni yo'q qiladi.
   */
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const missing: string[] = [];
  if (!botToken) missing.push("TELEGRAM_BOT_TOKEN");
  if (!chatId) missing.push("TELEGRAM_CHAT_ID");

  if (missing.length > 0) {
    console.error("O'rnatilmagan muhit o'zgaruvchilari:", missing.join(", "));
    /*
     * Javobda faqat NOMLAR qaytadi, qiymatlar hech qachon emas — sozlashdagi
     * xatoni panelga kirmasdan aniqlash uchun shu yetarli.
     */
    return json({ error: "Server sozlanmagan", missing }, 500);
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
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );

  if (!response.ok) {
    /*
     * Telegram'ning javob matni so'ralgan URL'ni, u bilan birga tokenni ham
     * o'z ichiga olishi mumkin — shuning uchun u faqat logga yoziladi,
     * mijozga esa umumiy xato qaytariladi.
     */
    console.error(
      "Telegram API xatosi:",
      response.status,
      await response.text(),
    );
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
