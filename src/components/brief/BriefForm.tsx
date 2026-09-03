import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { budgets, timelines } from "../../data/brief";
import { services } from "../../data/services";
import { pickLocalized } from "../../lib/localized";
import { FIELD_CLASSES } from "../../lib/formStyles";
import { sendToTelegram } from "../../lib/telegram";

type Status = "idle" | "sending" | "success" | "error";

type Fields = {
  name: string;
  company: string;
  contact: string;
  budget: string;
  timeline: string;
  project: string;
  refs: string;
};

const EMPTY: Fields = {
  name: "",
  company: "",
  contact: "",
  budget: "",
  timeline: "",
  project: "",
  refs: "",
};

/** To'ldirilishi shart bo'lgan matn maydonlari */
const REQUIRED = ["name", "contact", "project"] as const;

const LABEL_CLASSES = "mb-1.5 block text-sm";
const ERROR_CLASSES = "mt-1 text-xs text-red-400";

function BriefForm() {
  const { t, i18n } = useTranslation();

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof Fields | "services", boolean>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  /** Botlar to'ldiradigan yashirin maydon — odam uni ko'rmaydi */
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: false }));
  };

  const toggleService = (id: string) => {
    setPicked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    if (errors.services) {
      setErrors((current) => ({ ...current, services: false }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Yashirin maydon to'ldirilgan bo'lsa — bot. Jimgina "muvaffaqiyat" beramiz.
    if (honeypot) {
      setStatus("success");
      return;
    }

    const nextErrors: Partial<Record<keyof Fields | "services", boolean>> = {
      services: picked.length === 0,
    };
    for (const key of REQUIRED) nextErrors[key] = !fields[key].trim();

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");
    try {
      await sendToTelegram(buildMessage(fields, picked));
      setFields(EMPTY);
      setPicked([]);
      setStatus("success");
    } catch (error) {
      console.error("Brief formasi yuborilmadi:", error);
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const language = i18n.language;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="brief-name" className={LABEL_CLASSES}>
            {t("form-name")}
          </label>
          <input
            id="brief-name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder={t("form-name-ph")}
            aria-invalid={errors.name || undefined}
            aria-describedby={errors.name ? "brief-name-error" : undefined}
            className={FIELD_CLASSES}
          />
          {errors.name && (
            <p id="brief-name-error" className={ERROR_CLASSES}>
              {t("form-required")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="brief-company" className={LABEL_CLASSES}>
            {t("brief-company")}{" "}
            <span className="text-white/35">({t("brief-optional")})</span>
          </label>
          <input
            id="brief-company"
            value={fields.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder={t("brief-company-ph")}
            className={FIELD_CLASSES}
          />
        </div>
      </div>

      <div>
        <label htmlFor="brief-contact" className={LABEL_CLASSES}>
          {t("form-contact")}
        </label>
        <input
          id="brief-contact"
          value={fields.contact}
          onChange={(event) => update("contact", event.target.value)}
          placeholder={t("form-contact-ph")}
          aria-invalid={errors.contact || undefined}
          aria-describedby={errors.contact ? "brief-contact-error" : undefined}
          className={FIELD_CLASSES}
        />
        {errors.contact && (
          <p id="brief-contact-error" className={ERROR_CLASSES}>
            {t("form-required")}
          </p>
        )}
      </div>

      <fieldset
        aria-describedby={errors.services ? "brief-services-error" : undefined}
      >
        <legend className="text-sm">
          {t("brief-services")}{" "}
          <span className="text-white/35">({t("brief-services-hint")})</span>
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {services.map((service) => (
            <label
              key={service.id}
              className="glass cursor-pointer rounded-lg px-4 py-2 text-sm text-white/80 transition-colors select-none has-[:checked]:border-neon/60 has-[:checked]:text-neon has-[:focus-visible]:border-neon"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={picked.includes(service.id)}
                onChange={() => toggleService(service.id)}
              />
              {pickLocalized(service.title, language)}
            </label>
          ))}
        </div>
        {errors.services && (
          <p id="brief-services-error" className={ERROR_CLASSES}>
            {t("brief-pick-service")}
          </p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="brief-budget" className={LABEL_CLASSES}>
            {t("brief-budget")}{" "}
            <span className="text-white/35">({t("brief-optional")})</span>
          </label>
          <select
            id="brief-budget"
            value={fields.budget}
            onChange={(event) => update("budget", event.target.value)}
            className={FIELD_CLASSES}
          >
            <option value="" className="bg-ink">
              {t("brief-choose")}
            </option>
            {budgets.map((option) => (
              <option key={option.id} value={option.id} className="bg-ink">
                {pickLocalized(option.label, language)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="brief-timeline" className={LABEL_CLASSES}>
            {t("brief-timeline")}{" "}
            <span className="text-white/35">({t("brief-optional")})</span>
          </label>
          <select
            id="brief-timeline"
            value={fields.timeline}
            onChange={(event) => update("timeline", event.target.value)}
            className={FIELD_CLASSES}
          >
            <option value="" className="bg-ink">
              {t("brief-choose")}
            </option>
            {timelines.map((option) => (
              <option key={option.id} value={option.id} className="bg-ink">
                {pickLocalized(option.label, language)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="brief-project" className={LABEL_CLASSES}>
          {t("brief-project")}
        </label>
        <textarea
          id="brief-project"
          rows={5}
          value={fields.project}
          onChange={(event) => update("project", event.target.value)}
          placeholder={t("brief-project-ph")}
          aria-invalid={errors.project || undefined}
          aria-describedby={errors.project ? "brief-project-error" : undefined}
          className={`${FIELD_CLASSES} resize-y`}
        />
        {errors.project && (
          <p id="brief-project-error" className={ERROR_CLASSES}>
            {t("form-required")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="brief-refs" className={LABEL_CLASSES}>
          {t("brief-refs")}{" "}
          <span className="text-white/35">({t("brief-optional")})</span>
        </label>
        <textarea
          id="brief-refs"
          rows={3}
          value={fields.refs}
          onChange={(event) => update("refs", event.target.value)}
          placeholder={t("brief-refs-ph")}
          className={`${FIELD_CLASSES} resize-y`}
        />
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
        {isSending ? t("form-sending") : t("brief-submit")}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "success" && (
          <span className="text-neon">{t("brief-success")}</span>
        )}
        {status === "error" && (
          <span className="text-red-400">{t("form-error")}</span>
        )}
      </p>
    </form>
  );
}

/**
 * Telegram'ga ketadigan matn. Yorliqlar ataylab o'zbekcha: xabarni sayt
 * egasi o'qiydi, mijoz qaysi tilda to'ldirganiga bog'liq bo'lmasligi kerak.
 */
function buildMessage(fields: Fields, picked: string[]): string {
  const pickedLabels = services
    .filter((service) => picked.includes(service.id))
    .map((service) => service.title.uz)
    .join(", ");

  const budget = budgets.find((item) => item.id === fields.budget);
  const timeline = timelines.find((item) => item.id === fields.timeline);

  const lines = [
    "Yangi brif — portfolio sayti",
    "",
    `Ism: ${fields.name.trim()}`,
  ];

  if (fields.company.trim()) lines.push(`Kompaniya: ${fields.company.trim()}`);
  lines.push(`Aloqa: ${fields.contact.trim()}`);
  lines.push(`Xizmatlar: ${pickedLabels}`);
  if (budget) lines.push(`Byudjet: ${budget.label.uz}`);
  if (timeline) lines.push(`Muddat: ${timeline.label.uz}`);

  lines.push("", "Loyiha:", fields.project.trim());

  if (fields.refs.trim()) lines.push("", "Havolalar:", fields.refs.trim());

  return lines.join("\n");
}

export default BriefForm;
