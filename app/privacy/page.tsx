import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";
import { PRIVACY } from "@/lib/content/site/legal";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  "How YJ Ventures collects, uses, stores, shares, and protects personal data across its AI and automation products.",
  "/privacy",
);

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
