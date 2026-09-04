/**
 * Formalar xabarni shu yerdan yuboradi.
 *
 * Xabar Telegram'ga to'g'ridan-to'g'ri emas, `api/send.ts` serverless
 * funksiyasi orqali ketadi — bot tokeni faqat serverda turadi va brauzer
 * bundle'iga umuman tushmaydi.
 */
const ENDPOINT = "/api/send";

export async function sendToTelegram(text: string): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  /*
   * Javob tanasi ham tekshiriladi, chunki maqomning o'zi yetarli emas:
   * `npm run dev` da Vite serveri `/api/send` uchun index.html'ni 200 bilan
   * qaytaradi va forma hech narsa yubormay turib "muvaffaqiyat" ko'rsatardi.
   * HTML kelganda JSON tahlili yiqiladi va biz xatoni ko'ramiz.
   *
   * Funksiyani lokal sinash uchun `vercel dev` kerak — qarang README.
   */
  const data = (await response.json().catch(() => null)) as {
    ok?: boolean;
  } | null;

  if (!response.ok || !data?.ok) {
    throw new Error(`Xabar yuborilmadi: ${response.status}`);
  }
}
