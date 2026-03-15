"use client";

const LOGOS = [
  { name: "ElevenLabs", width: 130 },
  { name: "Google Cloud", width: 140 },
  { name: "Vercel", width: 100 },
  { name: "OpenAI", width: 110 },
  { name: "Turso", width: 90 },
  { name: "Next.js", width: 100 },
];

function LogoItem({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex items-center justify-center px-8 opacity-40 hover:opacity-70 transition-opacity"
      style={{ minWidth: width + 40 }}
    >
      <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section className="py-16 border-y border-border/30">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Powered by industry-leading technology
      </p>
      <div className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            animation: "marquee 30s linear infinite",
            width: "fit-content",
          }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <LogoItem key={i} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
