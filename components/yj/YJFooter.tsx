const footerLinks = [
  { label: "PRIVACY POLICY", href: "#" },
  { label: "TERMS OF SERVICE", href: "#" },
  { label: "CONTACT", href: "/contact" },
  { label: "DOCUMENTATION", href: "#" },
];

export function YJFooter() {
  return (
    <footer className="w-full py-16 bg-yj-surface-container-lowest border-t border-white/10 mt-auto relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-yj-primary-container/60 to-transparent"
      />
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 gap-4 max-w-[1440px] mx-auto">
        <div className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-[32px] font-medium text-yj-primary mb-6 md:mb-0">
          YJ VENTURES
        </div>
        <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-[0.15em] text-[var(--yj-on-tertiary-container)] uppercase transition-colors duration-200 hover:text-yj-secondary"
            >
              {l.label}
              <span
                aria-hidden
                className="absolute left-0 -bottom-1 h-px w-0 bg-yj-secondary shadow-[0_0_10px_rgba(222,183,255,0.6)] transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>
        <div className="font-[family-name:var(--font-inter)] text-sm text-[var(--yj-on-tertiary-container)]">
          © 2024 YJ VENTURES. AUTONOMOUS EXCELLENCE.
        </div>
      </div>
    </footer>
  );
}
