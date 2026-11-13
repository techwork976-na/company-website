import { z } from "zod";
import { serviceSlugs } from "@/content/services";

/** The eight service slugs, plus "other" for anything else. */
export const serviceIds: [string, ...string[]] = ["other", ...serviceSlugs];

export function isServiceId(value: unknown): value is string {
  return typeof value === "string" && serviceIds.includes(value);
}

/** Shared by the form (client) and the API route (server). */
export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(100, { error: "Please keep your name under 100 characters." }),
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .min(1, { error: "Please enter your email address." })
    .max(254, { error: "That email address is too long." })
    .pipe(z.email({ error: "Please enter a valid email address, like name@company.com." })),
  phone: z
    .string()
    .trim()
    .max(40, { error: "Please keep the phone number under 40 characters." })
    .refine((value) => value === "" || /^[+()\-.\s\d]{6,40}$/.test(value), {
      error: "Please enter a valid phone number, or leave it empty.",
    })
    .optional()
    .default(""),
  service: z.enum(serviceIds, { error: "Please choose a service." }),
  message: z
    .string({ error: "Please tell us a little about your project." })
    .trim()
    .min(10, { error: "Please tell us a little more (at least 10 characters)." })
    .max(5000, { error: "Please keep your message under 5,000 characters." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export const contactFields: ContactField[] = ["name", "email", "phone", "service", "message"];

/** First error message per field, from a failed parse. */
export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const flat = z.flattenError(error).fieldErrors as Partial<Record<ContactField, string[]>>;
  const result: Partial<Record<ContactField, string>> = {};
  for (const field of contactFields) {
    const message = flat[field]?.[0];
    if (message) result[field] = message;
  }
  return result;
}
