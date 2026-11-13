import type { NextRequest } from "next/server";
import { contactPage, site } from "@/content/site";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import { escapeHtml, getEmailConfig, sendContactEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { palette } from "@/lib/tokens";

/** Submissions faster than this after the form appeared are treated as bots. */
const MIN_FILL_TIME_MS = 3000;
const MAX_BODY_BYTES = 20_000;

type Result =
  | { status: 200; body: { ok: true } }
  | { status: 400 | 403 | 413 | 429 | 502 | 503; body: { error: string } }
  | { status: 422; body: { error: "invalid"; fields: Record<string, string> } };

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Plain-HTML reply for submissions made without JavaScript. */
function htmlPage(result: Result) {
  const ok = result.status === 200;
  const title = ok ? contactPage.form.successTitle : contactPage.form.failureTitle;
  const text = ok
    ? contactPage.form.successText
    : result.status === 429
      ? contactPage.form.rateLimited
      : `Please go back and check the form, or email us at ${site.contact.email}.`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;font-family:system-ui,sans-serif;background:${palette.surface};color:${palette.ink};">
<main style="max-width:560px;margin:15vh auto;padding:0 20px;line-height:1.6;">
<h1 style="font-size:32px;line-height:1.1;letter-spacing:-0.02em;">${escapeHtml(title)}</h1>
<p>${escapeHtml(text)}</p>
<p><a href="/contact" style="color:${palette.ink};">Back to the contact page</a></p>
</main></body></html>`;
}

function respond(result: Result, asHtml: boolean, headers: Record<string, string> = {}) {
  if (asHtml) {
    return new Response(htmlPage(result), {
      status: result.status,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", ...headers },
    });
  }
  return Response.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const asHtml = !isJson;

  // Only accept posts from this site.
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return respond({ status: 403, body: { error: "forbidden" } }, asHtml);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return respond({ status: 413, body: { error: "too_large" } }, asHtml);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return respond({ status: 429, body: { error: "rate_limited" } }, asHtml, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let raw: Record<string, unknown>;
  try {
    raw = isJson ? await request.json() : Object.fromEntries(await request.formData());
    if (!raw || typeof raw !== "object") throw new Error("Invalid body");
  } catch {
    return respond({ status: 400, body: { error: "bad_request" } }, asHtml);
  }

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return respond({ status: 200, body: { ok: true } }, asHtml);
  }

  // Time-to-submit: the form records when it appeared (JavaScript only).
  if (isJson || raw.startedAt) {
    const startedAt = Number(raw.startedAt);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
      return respond({ status: 200, body: { ok: true } }, asHtml);
    }
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return respond({ status: 422, body: { error: "invalid", fields: fieldErrors(parsed.error) } }, asHtml);
  }

  const config = getEmailConfig();
  if (!config) {
    console.warn(
      "Contact form: email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return respond({ status: 503, body: { error: "not_configured" } }, asHtml);
  }

  try {
    await sendContactEmails(parsed.data, config);
    return respond({ status: 200, body: { ok: true } }, asHtml);
  } catch (error) {
    console.error("Contact form: sending failed.", error);
    return respond({ status: 502, body: { error: "send_failed" } }, asHtml);
  }
}
