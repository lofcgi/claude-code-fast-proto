import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-brand flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <span className="font-bold">
                <span className="text-brand">Voice</span>Bridge
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered dubbing service.
              <br />
              Upload, translate, and dub your
              <br />
              content into any language.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              {["Features", "How it Works", "Languages", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Powered By</h4>
            <div className="space-y-2">
              {["ElevenLabs API", "Next.js 15", "Vercel", "Turso"].map(
                (item) => (
                  <span
                    key={item}
                    className="block text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VoiceBridge. Perso AI DevRel Intern Project.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Claude Code &amp; ElevenLabs
          </p>
        </div>
      </div>
    </footer>
  );
}
