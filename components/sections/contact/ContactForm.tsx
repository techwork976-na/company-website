"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactPage, serviceCategories, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { contactFields, contactSchema, fieldErrors, type ContactField } from "@/lib/contact-schema";
import { mailtoUrl } from "@/lib/site-url";
import { Button } from "@/components/ui/Button";

type Values = Record<ContactField, string>;
type Errors = Partial<Record<ContactField, string>>;
type Status = "idle" | "submitting" | "success" | "error" | "rate-limited" | "not-configured";

const copy = contactPage.form;
const emptyValues = (service = ""): Values => ({ name: "", email: "", phone: "", service, message: "" });

const inputClasses =
  "block w-full rounded-ui border border-line-input bg-bg px-4 text-ink transition-[border-color,background-color] duration-[var(--dur-fast)] ease-brand placeholder:text-ink-soft hover:border-ink focus:border-ink aria-invalid:border-error";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

function Field({ id, label, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-[0.9375rem] font-medium text-ink">
        <span>{label}</span>
        {optional ? <span className="text-[0.875rem] font-normal text-ink-soft">{copy.optional}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="field-error mt-2 text-[0.9375rem] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact form with inline validation (zod, shared with the API route),
 * a honeypot, a time-to-submit check, loading, success, failure with retry
 * and rate-limit states. Typed text is never lost on failure. Without
 * JavaScript it still posts to the API route as a normal form.
 */
export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const uid = useId();
  const id = (field: ContactField) => `${uid}-${field}`;

  const [values, setValues] = useState<Values>(() => emptyValues(initialService));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [announcement, setAnnouncement] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const sentRef = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
    // JavaScript validates inline, so switch off the browser's own bubbles.
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Navigating away hides this page (it is kept for back navigation).
  // After a successful send, come back to a fresh form, not a stale message.
  useLayoutEffect(() => {
    return () => {
      if (!sentRef.current) return;
      sentRef.current = false;
      setStatus("idle");
      setValues(emptyValues(initialService));
      startedAt.current = Date.now();
    };
  }, [initialService]);

  const errorFor = (next: Values, field: ContactField) => {
    const result = contactSchema.safeParse(next);
    return result.success ? undefined : fieldErrors(result.error)[field];
  };

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the visitor fixes it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: errorFor(next, field) }));
  };

  const validateOnBlur = (field: ContactField) => {
    if (!values[field] && !errors[field]) return;
    setErrors((current) => ({ ...current, [field]: errorFor(values, field) }));
  };

  const showErrors = (next: Errors) => {
    setErrors(next);
    const count = Object.values(next).filter(Boolean).length;
    setAnnouncement(copy.errorSummary(count));
    const first = contactFields.find((field) => next[field]);
    if (first) document.getElementById(id(first))?.focus();
  };

  async function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (status === "submitting") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      showErrors(fieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setStatus("submitting");
    setAnnouncement(copy.sending);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: honeypotRef.current?.value ?? "",
          startedAt: startedAt.current,
        }),
      });

      if (response.ok) {
        sentRef.current = true;
        setStatus("success");
        setAnnouncement(copy.successTitle);
        return;
      }

      const data: { error?: string; fields?: Errors } = await response.json().catch(() => ({}));
      if (response.status === 422 && data.fields) {
        setStatus("idle");
        showErrors(data.fields);
      } else if (response.status === 429) {
        setStatus("rate-limited");
        setAnnouncement(copy.rateLimited);
      } else if (response.status === 503 && data.error === "not_configured") {
        setStatus("not-configured");
        setAnnouncement(copy.failureTitle);
      } else {
        setStatus("error");
        setAnnouncement(copy.failureTitle);
      }
    } catch {
      setStatus("error");
      setAnnouncement(copy.failureTitle);
    }
  }

  const describedBy = (field: ContactField) => (errors[field] ? `${id(field)}-error` : undefined);

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="form-success rounded-card border border-line bg-surface p-6 outline-none sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-surface">
          <Check aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </span>
        <h2 className="mt-6 text-h3 text-ink">{copy.successTitle}</h2>
        <p className="mt-3 max-w-[30rem] text-ink2">{copy.successText}</p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            sentRef.current = false;
            setValues(emptyValues(initialService));
            setStatus("idle");
            startedAt.current = Date.now();
          }}
        >
          {copy.successAgain}
        </Button>
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    );
  }

  const failure =
    status === "error" || status === "rate-limited" || status === "not-configured"
      ? {
          title: status === "rate-limited" ? copy.rateLimited : copy.failureTitle,
          text:
            status === "not-configured" && process.env.NODE_ENV !== "production"
              ? copy.notConfigured
              : status === "rate-limited"
                ? undefined
                : copy.failureText,
        }
      : null;

  return (
    <form
      ref={formRef}
      action="/api/contact"
      method="post"
      onSubmit={submit}
      aria-busy={status === "submitting"}
      className="relative space-y-5"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id={id("name")} label={copy.nameLabel} error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => validateOnBlur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(inputClasses, "h-12")}
          />
        </Field>
        <Field id={id("email")} label={copy.emailLabel} error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => validateOnBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(inputClasses, "h-12")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id={id("phone")} label={copy.phoneLabel} error={errors.phone} optional>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            onBlur={() => validateOnBlur("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(inputClasses, "h-12")}
          />
        </Field>
        <Field id={id("service")} label={copy.serviceLabel} error={errors.service}>
          <div className="relative">
            <select
              id={id("service")}
              name="service"
              required
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
              onBlur={() => validateOnBlur("service")}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={cn(inputClasses, "h-12 appearance-none pr-12", !values.service && "text-ink-soft")}
            >
              <option value="" disabled>
                {copy.servicePlaceholder}
              </option>
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.id} className="text-ink">
                  {category.title}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink"
            />
          </div>
        </Field>
      </div>

      <Field id={id("message")} label={copy.messageLabel} error={errors.message}>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={copy.messagePlaceholder}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => validateOnBlur("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          className={cn(inputClasses, "min-h-36 resize-y py-3")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input ref={honeypotRef} id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {failure ? (
        <div role="alert" className="field-error rounded-ui border border-error p-4">
          <p className="font-medium text-error">{failure.title}</p>
          {failure.text ? <p className="mt-1 text-ink2">{failure.text}</p> : null}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            {status === "error" ? (
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                className="inline-flex min-h-11 items-center font-medium text-ink"
              >
                <span className="link-slide">{copy.retry}</span>
              </button>
            ) : null}
            <a href={mailtoUrl("Project enquiry")} className="link-slide link-inline inline-flex min-h-11 items-center text-ink">
              {site.contact.email}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          aria-disabled={status === "submitting" ? true : undefined}
          arrow={status !== "submitting"}
          className="w-full overflow-hidden aria-disabled:cursor-progress sm:w-auto"
        >
          {status === "submitting" ? copy.sending : copy.submit}
          {status === "submitting" ? <span aria-hidden="true" className="sending-bar" /> : null}
        </Button>
        <p className="text-[0.875rem] text-ink-soft">{site.contact.responseTime}</p>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </form>
  );
}
