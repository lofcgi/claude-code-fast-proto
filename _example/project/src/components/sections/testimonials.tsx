"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    avatar:
      "https://images.unsplash.com/photo-1657152042392-c1f39e52e7c9?w=96&h=96&fit=crop&crop=faces",
    quote:
      "DubbingApp completely transformed my workflow. I can now reach audiences in 10+ languages without hiring voice actors for each one.",
  },
  {
    name: "Marcus Rivera",
    role: "YouTuber",
    avatar:
      "https://images.unsplash.com/photo-1714750977930-e7a7f4611257?w=96&h=96&fit=crop&crop=faces",
    quote:
      "The voice quality is incredible — my Spanish-speaking subscribers thought I actually learned the language. Game changer for growth.",
  },
  {
    name: "Emily Park",
    role: "E-learning Producer",
    avatar:
      "https://images.unsplash.com/photo-1681500920181-0aff411f8cab?w=96&h=96&fit=crop&crop=faces",
    quote:
      "We reduced our localization budget by 80% while actually improving turnaround time. The transcription accuracy is phenomenal.",
  },
  {
    name: "James Mitchell",
    role: "Podcast Host",
    avatar:
      "https://images.unsplash.com/photo-1592878995758-02b32ddabdd3?w=96&h=96&fit=crop&crop=faces",
    quote:
      "I was skeptical about AI dubbing, but the natural intonation and emotion preservation won me over. My listeners can't tell the difference.",
  },
  {
    name: "Aisha Patel",
    role: "Marketing Director",
    avatar:
      "https://images.unsplash.com/photo-1594938350684-4c251b5030d1?w=96&h=96&fit=crop&crop=faces",
    quote:
      "Launching campaigns in multiple markets simultaneously used to take weeks. Now it takes hours. The ROI speaks for itself.",
  },
  {
    name: "David Kim",
    role: "Localization Manager",
    avatar:
      "https://images.unsplash.com/photo-1649151139875-ae8ea07082e2?w=96&h=96&fit=crop&crop=faces",
    quote:
      "The batch processing feature saved us hundreds of hours. We process our entire video library in a fraction of the time it used to take.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Loved by creators
            <br />
            worldwide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card rounded-3xl p-6 border border-border/30"
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
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
