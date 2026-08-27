/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Telegram bot tokeni — @BotFather beradi */
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  /** Xabar tushadigan chat id — @userinfobot beradi */
  readonly VITE_TELEGRAM_CHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
