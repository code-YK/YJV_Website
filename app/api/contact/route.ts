import { NextResponse } from "next/server";
import { ContactFormSchema, SERVICE_LABELS, BUDGET_LABELS } from "@/lib/schemas/contact";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ["Invalid JSON body."] } },
      { status: 400 },
    );
  }

  const parsed = ContactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set; submission logged only:",
      data,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const html = renderEmail(data);
    const subject = `New lead: ${data.name} — ${SERVICE_LABELS[data.service]}`;
    const fromAddress =
      process.env.RESEND_FROM_ADDRESS ?? "YJ Ventures <noreply@yjventures.in>";
    const toAddress = process.env.CONTACT_TO_ADDRESS ?? "info@yjventures.in";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: data.email,
      subject,
      html,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          errors: {
            _form: [
              "We couldn't deliver your message right now. Please try again, or email info@yjventures.in directly.",
            ],
          },
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          _form: [
            "Something went wrong on our side. Please try again in a moment, or email info@yjventures.in directly.",
          ],
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

function renderEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: keyof typeof SERVICE_LABELS;
  budget: keyof typeof BUDGET_LABELS;
  description: string;
}) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Service", SERVICE_LABELS[data.service]],
    ["Budget", BUDGET_LABELS[data.budget]],
  ];

  return `
    <div style="font-family: -apple-system, sans-serif; background: #0a0a0a; color: #f0f0f0; padding: 24px;">
      <h2 style="margin: 0 0 16px; color: #3b82f6;">New lead from yjventures.in</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #1f1f1f; color: #888; width: 120px;">${k}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #1f1f1f;">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin-top: 24px; color: #8b5cf6;">Message</h3>
      <p style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(data.description)}</p>
    </div>
  `;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
