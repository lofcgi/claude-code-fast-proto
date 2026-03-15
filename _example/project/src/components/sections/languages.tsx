"use client";

import { motion } from "framer-motion";

const LANGUAGES = [
  { flag: "🇰🇷", name: "Korean" },
  { flag: "🇺🇸", name: "English" },
  { flag: "🇯🇵", name: "Japanese" },
  { flag: "🇨🇳", name: "Chinese" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇫🇷", name: "French" },
  { flag: "🇩🇪", name: "German" },
  { flag: "🇧🇷", name: "Portuguese" },
  { flag: "🇮🇳", name: "Hindi" },
  { flag: "🇸🇦", name: "Arabic" },
  { flag: "🇮🇹", name: "Italian" },
  { flag: "🇷🇺", name: "Russian" },
  { flag: "🇹🇷", name: "Turkish" },
  { flag: "🇻🇳", name: "Vietnamese" },
  { flag: "🇹🇭", name: "Thai" },
];

export function Languages() {
  return (
    <section id="languages" className="py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-4">
            Global Reach
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            29+ Languages Supported
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Break language barriers and reach audiences worldwide with
            natural-sounding AI voices.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: i * 0.03,
              }}
              className="bg-card border border-border/50 rounded-2xl p-4 text-center hover:border-brand/30 hover:bg-brand/5 transition-all cursor-default group"
            >
              <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                {lang.flag}
              </span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {lang.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
