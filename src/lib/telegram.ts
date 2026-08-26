const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

/**
 * Bot ma'lumotlari `.env` da berilganmi. Berilmagan bo'lsa forma
 * yuborishga urinmaydi — foydalanuvchiga xato ko'rsatadi.
 */
export const isTelegramConfigured = Boolean(BOT_TOKEN && CHAT_ID);

/**
 * Xabarni Telegram'ga yuboradi.
 *
 * Diqqat: token brauzerga tushadigan bundle ichida bo'ladi — buni yashirib
 * bo'lmaydi. Shuning uchun faqat shu sayt uchun ochilgan, boshqa hech
 * qayerda ishlatilmaydigan bot tokeni qo'yilishi kerak.
 *
 * `parse_mode` ataylab berilmagan: foydalanuvchi matnidagi `<` yoki `&`
 * kabi belgilar Telegram'ning HTML tahlilini buzib, yuborishni yiqitardi.
 */
export async function sendToTelegram(text: string): Promise<void> {
  if (!isTelegramConfigured) {
    throw new Error("Telegram bot .env da sozlanmagan");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram API xatosi: ${response.status}`);
  }
}
