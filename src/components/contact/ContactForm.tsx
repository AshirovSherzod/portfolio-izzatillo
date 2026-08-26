import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../../lib/telegram";

type Status = "idle" | "sending" | "success" | "error";

type Fields = { name: string; contact: string; message: string };

const EMPTY: Fields = { name: "", contact: "", message: "" };

const FIELD_CLASSES =
  "w-full rounded-lg border border-white/[0.16] bg-ink/60 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-neon/60 focus:outline-none";

function ContactForm() {
  const { t } = useTranslation();

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, boolean>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  /** Botlar to'ldiradigan yashirin maydon — odam uni ko'rmaydi */
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: false }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Yashirin maydon to'ldirilgan bo'lsa — bot. Jimgina "muvaffaqiyat" beramiz.
    if (honeypot) {
      setStatus("success");
      return;
    }

    const nextErrors = {
      name: !fields.name.trim(),
      contact: !fields.contact.trim(),
      message: !fields.message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");
    try {
      await sendToTelegram(
        [
          "Yangi xabar — portfolio sayti",
          "",
          `Ism: ${fields.name.trim()}`,
          `Aloqa: ${fields.contact.trim()}`,
          "",
          fields.message.trim(),
        ].join("\n"),
      );
      setFields(EMPTY);
      setStatus("success");
    } catch (error) {
      console.error("Contact formasi yuborilmadi:", error);
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm">
          {t("form-name")}
        </label>
        <input
          id="contact-name"
          value={fields.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder={t("form-name-ph")}
          aria-invalid={errors.name || undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={FIELD_CLASSES}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-xs text-red-400">
            {t("form-required")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-handle" className="mb-1.5 block text-sm">
          {t("form-contact")}
        </label>
        <input
          id="contact-handle"
          value={fields.contact}
          onChange={(event) => update("contact", event.target.value)}
          placeholder={t("form-contact-ph")}
          aria-invalid={errors.contact || undefined}
          aria-describedby={errors.contact ? "contact-handle-error" : undefined}
          className={FIELD_CLASSES}
        />
        {errors.contact && (
          <p id="contact-handle-error" className="mt-1 text-xs text-red-400">
            {t("form-required")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm">
          {t("form-message")}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={t("form-message-ph")}
          aria-invalid={errors.message || undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`${FIELD_CLASSES} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-xs text-red-400">
            {t("form-required")}
          </p>
        )}
      </div>

      {/* Honeypot: ekrandan yashirin, skrinriderdan ham berkitilgan */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={isSending}
        className="h-11 rounded-lg bg-neon font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSending ? t("form-sending") : t("form-submit")}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <span className="text-neon">{t("form-success")}</span>
        )}
        {status === "error" && (
          <span className="text-red-400">{t("form-error")}</span>
        )}
      </p>
    </form>
  );
}

export default ContactForm;
