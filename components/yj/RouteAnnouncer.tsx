"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function pathToLabel(pathname: string): string {
  if (!pathname || pathname === "/") return "Home";
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "";
  return last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RouteAnnouncer() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!pathname) return;
    setMessage(`Navigated to ${pathToLabel(pathname)}`);
  }, [pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
