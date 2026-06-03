"use client";

import { Component, type ReactNode } from "react";

/**
 * Minimal error boundary for decorative WebGL canvases. If a Three.js / r3f
 * context fails to create (WebGL disabled, sandboxed, or context lost), it
 * renders nothing instead of crashing the whole page.
 */
interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[CanvasErrorBoundary] disabling 3D background:", error);
    }
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
