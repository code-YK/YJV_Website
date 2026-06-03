import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  WorkflowGraph,
  type WorkflowNode,
} from "@/components/shared/WorkflowGraph";

const compactNodes: WorkflowNode[] = [
  { kind: "compact", label: "Discovery" },
  { kind: "compact", label: "Build" },
  { kind: "compact", label: "Launch" },
];

const richNodes: WorkflowNode[] = [
  {
    kind: "rich",
    label: "Discovery call",
    sublabel: "Thirty minutes, free.",
    icon: "MessageSquare",
    deliverables: ["30-minute call", "Written next-step"],
  },
  {
    kind: "rich",
    label: "Scoping doc",
    sublabel: "Within 48 hours.",
    icon: "FileText",
    deliverables: ["Fixed price"],
  },
];

describe("WorkflowGraph", () => {
  it("renders an <ol> with one <li> per node", () => {
    const { container } = render(<WorkflowGraph nodes={compactNodes} />);
    const ol = container.querySelector("ol");
    expect(ol).not.toBeNull();
    expect(ol!.querySelectorAll("li")).toHaveLength(compactNodes.length);
  });

  it("renders each node label", () => {
    render(<WorkflowGraph nodes={compactNodes} />);
    for (const node of compactNodes) {
      expect(screen.getByText(node.label)).toBeInTheDocument();
    }
  });

  it("renders zero-padded indices (01, 02, 03)", () => {
    render(<WorkflowGraph nodes={compactNodes} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders input and output port markers per node", () => {
    const { container } = render(<WorkflowGraph nodes={compactNodes} />);
    expect(container.querySelectorAll('[data-port="in"]')).toHaveLength(
      compactNodes.length,
    );
    expect(container.querySelectorAll('[data-port="out"]')).toHaveLength(
      compactNodes.length,
    );
  });

  it("renders sublabel and deliverables only for rich nodes", () => {
    render(<WorkflowGraph nodes={richNodes} />);
    expect(screen.getByText("Thirty minutes, free.")).toBeInTheDocument();
    expect(screen.getByText("30-minute call")).toBeInTheDocument();
    expect(screen.getByText("Written next-step")).toBeInTheDocument();
    expect(screen.getByText("Fixed price")).toBeInTheDocument();
  });

  it("does not render sublabel content for compact nodes", () => {
    render(<WorkflowGraph nodes={compactNodes} />);
    expect(screen.queryByText("Thirty minutes, free.")).not.toBeInTheDocument();
  });

  it("applies the forced-dark wrapper", () => {
    const { container } = render(<WorkflowGraph nodes={compactNodes} />);
    expect(container.querySelector('[data-theme="dark"]')).toBeInTheDocument();
  });

  it("exposes the ariaLabel and id on the region wrapper", () => {
    render(
      <WorkflowGraph
        nodes={compactNodes}
        ariaLabel="My workflow"
        id="wf-test"
      />,
    );
    const region = screen.getByRole("region", { name: "My workflow" });
    expect(region).toHaveAttribute("id", "wf-test");
  });

  it("scopes the index span and label inside the same <li> per node", () => {
    const { container } = render(<WorkflowGraph nodes={compactNodes} />);
    const items = container.querySelectorAll("li");
    compactNodes.forEach((node, i) => {
      const li = items[i];
      const scoped = within(li);
      expect(
        scoped.getByText(String(i + 1).padStart(2, "0")),
      ).toBeInTheDocument();
      expect(scoped.getByText(node.label)).toBeInTheDocument();
    });
  });

  it("renders nothing crash-worthy when given a single node (no paths)", () => {
    const { container } = render(
      <WorkflowGraph nodes={[{ kind: "compact", label: "Solo" }]} />,
    );
    expect(screen.getByText("Solo")).toBeInTheDocument();
    // Should still render the SVG container, just with no <path> children
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the icon for nodes that supply one", () => {
    const { container } = render(<WorkflowGraph nodes={richNodes} />);
    // each rich node has an icon → at least 2 svgs (icons) + 1 svg (overlay)
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(3);
  });
});
