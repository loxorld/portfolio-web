export default function LoadingProjects() {
  return (
    <main className="space-y-8">
      <section className="spotlight-card">
        <div className="max-w-3xl space-y-4">
          <div className="h-3 w-32 rounded-full bg-white/10" />
          <div className="h-12 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="h-5 w-full max-w-xl rounded-full bg-white/8" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="project-card animate-pulse space-y-5">
            <div className="h-64 rounded-[24px] bg-white/8" />
            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-white/10" />
              <div className="h-8 w-3/4 rounded-full bg-white/10" />
              <div className="h-4 w-full rounded-full bg-white/8" />
              <div className="h-4 w-5/6 rounded-full bg-white/8" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
