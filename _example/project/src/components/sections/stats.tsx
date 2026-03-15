"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "29+", label: "Languages Supported" },
  { value: "100K+", label: "Minutes Dubbed" },
  { value: "99.2%", label: "Transcription Accuracy" },
  { value: "50+", label: "Voice Styles" },
];

export function Stats() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-brand/10 to-brand/5" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: i * 0.1,
              }}
            >
              <p className="text-5xl font-bold text-brand mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
