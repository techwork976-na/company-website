import { Resend } from "resend";
import { serviceCategories, site } from "@/content/site";
import type { ContactInput } from "./contact-schema";
import { palette } from "./tokens";

export type EmailConfig = { apiKey: string; to: string; from: string };

/** Reads email settings from the environment. Returns null if any are missing. */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** Escapes text for safe use inside HTML. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes line breaks and control characters from header values such as the subject. */
export function headerSafe(value: string, max = 120) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function serviceTitle(id: ContactInput["service"]) {
  return serviceCategories.find((category) => category.id === id)?.title ?? id;
}

function layout(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${palette.surface};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.surface};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${palette.bg};border:1px solid ${palette.muted};border-radius:8px;">
<tr><td style="padding:32px;font-family:Inter,Arial,sans-serif;color:${palette.ink};font-size:16px;line-height:1.6;">
${content}
</td></tr></table>
<p style="font-family:Inter,Arial,sans-serif;font-size:13px;color:${palette.ink2};margin:16px 0 0;">${escapeHtml(site.name)}</p>
</td></tr></table></body></html>`;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:10px 0;border-bottom:1px solid ${palette.muted};vertical-align:top;width:110px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:${palette.ink2};">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid ${palette.muted};vertical-align:top;">${value}</td></tr>`;
}

export function enquiryEmail(input: ContactInput) {
  const message = escapeHtml(input.message).replace(/\r?\n/g, "<br>");
  const html = layout(`
<p style="margin:0 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:${palette.ink2};">New enquiry</p>
<h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;font-weight:600;">${escapeHtml(input.name)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
${row("Name", escapeHtml(input.name))}
${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${palette.ink};">${escapeHtml(input.email)}</a>`)}
${row("Phone", escapeHtml(input.phone || "Not given"))}
${row("Service", escapeHtml(serviceTitle(input.service)))}
</table>
<p style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:${palette.ink2};">Message</p>
<p style="margin:0;">${message}</p>`);

  const text = [
    "New enquiry",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "Not given"}`,
    `Service: ${serviceTitle(input.service)}`,
    "",
    input.message,
  ].join("\n");

  return {
    subject: headerSafe(`New enquiry from ${input.name}: ${serviceTitle(input.service)}`),
    html,
    text,
  };
}

export function confirmationEmail(input: ContactInput) {
  const firstName = input.name.split(/\s+/)[0] ?? input.name;
  const html = layout(`
<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;font-weight:600;">Thanks, ${escapeHtml(firstName)}. We'll reply within 24 hours.</h1>
<p style="margin:0 0 16px;">We have received your message about <strong>${escapeHtml(serviceTitle(input.service))}</strong> and will get back to you within 24 hours on working days.</p>
<p style="margin:0;">If anything is urgent, reply to this email or write to <a href="mailto:${escapeHtml(site.contact.email)}" style="color:${palette.ink};">${escapeHtml(site.contact.email)}</a>.</p>`);

  const text = [
    `Thanks, ${firstName}. We'll reply within 24 hours.`,
    "",
    `We have received your message about ${serviceTitle(input.service)} and will get back to you within 24 hours on working days.`,
    "",
    `If anything is urgent, reply to this email or write to ${site.contact.email}.`,
    "",
    site.name,
  ].join("\n");

  return { subject: "Thanks, we'll reply within 24 hours", html, text };
}

/** Sends the enquiry to the agency, then a confirmation to the visitor. */
export async function sendContactEmails(input: ContactInput, config: EmailConfig) {
  const resend = new Resend(config.apiKey);
  const enquiry = enquiryEmail(input);
  const sent = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: enquiry.subject,
    html: enquiry.html,
    text: enquiry.text,
  });
  if (sent.error) throw new Error(`Resend: ${sent.error.message}`);

  // The enquiry is what matters; a failed confirmation is logged, not fatal.
  const confirmation = confirmationEmail(input);
  const confirmed = await resend.emails.send({
    from: config.from,
    to: input.email,
    replyTo: config.to,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
  });
  if (confirmed.error) console.warn("Contact confirmation email failed:", confirmed.error.message);
}
