import { cn } from "@/lib/utils";

interface RaisedBandProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a section in a slightly raised background, so the page alternates
 * between solid black and a subtle slate band. Pure presentation; no layout
 * changes to the wrapped children.
 */
export function RaisedBand({ children, className }: RaisedBandProps) {
  return (
    <div className={cn("bg-[var(--bg-secondary)]/40", className)}>
      {children}
    </div>
  );
}
