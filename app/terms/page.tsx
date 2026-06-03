import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";
import { TERMS } from "@/lib/content/site/legal";

export const metadata: Metadata = pageMetadata(
  "Terms of Service",
  "The terms governing access to YJ Ventures websites, AI tools, automation services, and software products.",
  "/terms",
);

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
