"use client";

import { useSearchParams } from "next/navigation";
import { isServiceId } from "@/lib/contact-schema";
import { ContactForm } from "./ContactForm";

/** Preselects the service from ?service=software|ai|web. */
export function ContactFormWithParams() {
  const service = useSearchParams().get("service");
  const initialService = isServiceId(service) ? service : "";
  return <ContactForm key={initialService} initialService={initialService} />;
}
