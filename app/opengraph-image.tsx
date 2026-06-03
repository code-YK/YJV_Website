import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YJ Ventures — AI Automation & SaaS Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.22), transparent 55%)",
          color: "#f0f0f0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#888888",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#3b82f6",
              boxShadow: "0 0 24px #3b82f6",
            }}
          />
          YJ Ventures
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: 980,
              whiteSpace: "pre-line",
            }}
          >
            {"AI Automation & SaaS,\nbuilt to ship."}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a0a0a0",
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            Agentic AI, custom SaaS, and intelligent workflows for teams that want
            outcomes, not slide decks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#888888",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span>Agentic AI</span>
            <span style={{ color: "#3b82f6" }}>·</span>
            <span>Custom SaaS</span>
            <span style={{ color: "#8b5cf6" }}>·</span>
            <span>Automation</span>
          </div>
          <div style={{ color: "#f0f0f0" }}>yjventures.in</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
