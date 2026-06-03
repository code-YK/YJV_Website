/**
 * Legal page content — Privacy Policy, Terms of Service, Data Deletion.
 * Section headings mirror the reference site; bodies are concise faithful
 * summaries. These pages intentionally carry NO sales CTA (audit fix).
 */
export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const LAST_UPDATED = "May 14, 2026";

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  lastUpdated: LAST_UPDATED,
  intro:
    "This policy explains how YJVentures handles personal information across its AI-powered communication, automation, support, and business workflow products.",
  sections: [
    { heading: "1. Introduction", body: ["YJVentures provides AI-powered communication, automation, appointment management, customer support, and business workflow solutions. This policy describes what we collect, why, and the choices you have."] },
    { heading: "2. Information We Collect", body: ["We collect information you provide (such as contact details and messages), information generated through use of our services (such as conversation logs and usage metrics), and limited technical data (such as device and log information)."] },
    { heading: "3. How We Use Personal Data", body: ["We use personal data to deliver and improve our services, operate automations on your behalf, provide support, ensure security, and comply with legal obligations. We do not sell personal data."] },
    { heading: "4. Third-Party Integrations", body: ["Our services connect to third-party platforms (for example messaging providers and CRMs) at your direction. Data shared with those platforms is governed by their own terms and privacy policies."] },
    { heading: "5. Data Retention and Security", body: ["We retain personal data only as long as needed for the purposes described in this policy or as required by law, after which it is deleted or anonymized. We apply encryption in transit and at rest, role-based access controls, and other safeguards designed to protect personal data against loss, misuse, and unauthorized access. No system is perfectly secure, but we work to limit what we collect and to protect what we hold."] },
    { heading: "6. Cookies and Tracking", body: ["Our websites use cookies and similar technologies for essential functionality and analytics. You can control non-essential cookies through your browser settings."] },
    { heading: "7. Your Rights and Deletion Options", body: ["Subject to applicable law, you may request access to, correction of, or deletion of your personal data. See our Data Deletion page for how to submit a request."] },
    { heading: "8. Children, International Processing, and AI Limits", body: ["Our services are not directed to children. Data may be processed in regions where we or our providers operate. AI outputs are generated automatically and may be imperfect; they should be reviewed before relied upon."] },
    { heading: "9. Contact and Policy Updates", body: ["We may update this policy from time to time and will revise the date above. Questions? Contact info@yjventures.in."] },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  lastUpdated: LAST_UPDATED,
  intro:
    "These terms govern access to and use of YJVentures websites, AI systems, automation products, and related services.",
  sections: [
    { heading: "1. Acceptance of Terms", body: ["By accessing or using any YJVentures product or service, you agree to these Terms of Service. Using them on behalf of a company means you have authority to bind that company."] },
    { heading: "2. Description of Services", body: ["YJVentures provides AI-powered communication, automation, appointment management, customer support, and business workflow tools, along with related professional services. The services may rely on third-party platforms and models, and specific features may be added, changed, or removed as we improve the product. We aim to give reasonable notice of material changes that affect how you use the services."] },
    { heading: "3. User Responsibilities", body: ["You are responsible for your account credentials, the content you submit, the conduct of your end users, and for using the services in compliance with applicable laws, regulations, and the policies of any connected third-party platforms. You agree to obtain any consents required to process the personal data of your customers or contacts through the services, and to use the services only for lawful, authorized purposes."] },
    { heading: "4. Prohibited Activities", body: ["You may not use the services for unlawful, abusive, infringing, or harmful activity, or to send spam or violate the rules of connected third-party platforms."] },
    { heading: "5. AI Output Disclaimer", body: ["AI-generated outputs are produced automatically and may be inaccurate or incomplete. You are responsible for reviewing outputs before acting on them."] },
    { heading: "6. Third-Party Dependency Disclaimer", body: ["The services rely on third-party platforms and APIs. We are not responsible for outages, changes, or actions of those third parties."] },
    { heading: "7. Intellectual Property", body: ["YJVentures retains all rights in its software and platform. You retain rights in your own content."] },
    { heading: "8. Suspension, Warranty, Liability, and Indemnity", body: ["We may suspend access for violations. The services are provided “as is” without warranties, our liability is limited to the extent permitted by law, and you agree to indemnify us for misuse."] },
    { heading: "9. Privacy, Governing Law, and Changes", body: ["Use of the services is also governed by our Privacy Policy. These terms are governed by applicable local law, and we may update them with notice via this page."] },
    { heading: "10. Contact Information", body: ["Questions about these terms? Contact info@yjventures.in."] },
  ],
};

export const DATA_DELETION: LegalDoc = {
  title: "Data Deletion",
  lastUpdated: LAST_UPDATED,
  intro:
    "Use this page to request deletion of personal data collected by YJVentures across its products, workflows, and service channels.",
  sections: [
    { heading: "1. Your Deletion Rights", body: ["You may request deletion of personal data that YJVentures holds about you across our products, services, websites, automation workflows, and communication channels. This includes information you provided directly, such as contact details and messages, as well as records generated through your use of our services, such as conversation logs and usage data. The right to request deletion is available to all users, subject to the verification and retention rules described below."] },
    { heading: "2. Supported Request Methods", body: ["You can submit a deletion request by emailing info@yjventures.in or by using the contact form on our website. To help us locate the right records quickly, please include the email address, phone number, or account details associated with your data, along with a clear description of what you would like deleted. If your data was collected through a specific product or channel, mentioning it helps us act faster and more accurately."] },
    { heading: "3. Verification Process", body: ["To protect you from unauthorized or fraudulent requests, we verify the identity of the person making a deletion request before we act on it. The level of verification is proportionate to the sensitivity of the data involved and may involve confirming details we already hold. We will not delete data on the basis of a request we cannot reasonably attribute to the data subject or an authorized representative."] },
    { heading: "4. Timeline and Retained Records", body: ["Once a request is verified, we process it within a reasonable period and confirm when it is complete. Certain records may be retained where we are legally required to keep them, where they are necessary to establish or defend legal claims, or where a legitimate business need applies — for example, transaction records kept for accounting or compliance. Where we retain data for these reasons, we limit it to what is strictly necessary."] },
    { heading: "5. Important Notes", body: ["Please note that deleting your data may affect or disable services that depend on it, and that this action generally cannot be undone. Data that was shared, at your direction, with third-party platforms such as messaging providers or CRMs is governed by those platforms' own deletion processes, and you may need to contact them separately. If you have any questions about a request, contact us at info@yjventures.in."] },
  ],
};
