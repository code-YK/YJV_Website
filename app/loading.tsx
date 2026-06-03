export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading content"
      className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-hub-paper px-5 pt-32 pb-20 text-hub-ink md:px-12 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="hub-skeleton h-3 w-32 rounded-full" />
        <div className="mt-8 hub-skeleton h-[clamp(48px,8vw,96px)] w-full max-w-2xl rounded-md" />
        <div className="mt-4 hub-skeleton h-[clamp(48px,8vw,96px)] w-full max-w-xl rounded-md" />
        <div className="mt-10 flex w-full max-w-md flex-col gap-3">
          <div className="hub-skeleton h-3 w-full rounded-full" />
          <div className="hub-skeleton h-3 w-[88%] rounded-full" />
          <div className="hub-skeleton h-3 w-[72%] rounded-full" />
        </div>
        <div className="mt-12 flex gap-3">
          <div className="hub-skeleton h-11 w-40 rounded-full" />
          <div className="hub-skeleton h-11 w-40 rounded-full" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </section>
  );
}
