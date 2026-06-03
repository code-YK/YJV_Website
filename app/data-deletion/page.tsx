import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/site/LegalPage";
import { DATA_DELETION } from "@/lib/content/site/legal";

// Audit fix: this page previously inherited the generic homepage title/desc.
export const metadata: Metadata = pageMetadata(
  "Data Deletion",
  "Request deletion of personal data collected by YJ Ventures across its products, workflows, and service channels.",
  "/data-deletion",
);

export default function DataDeletionPage() {
  return <LegalPage doc={DATA_DELETION} />;
}
