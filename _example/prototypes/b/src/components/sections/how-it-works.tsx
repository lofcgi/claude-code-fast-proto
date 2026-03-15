"use client";

import { motion } from "framer-motion";
import { Upload, Globe, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload",
    description:
      "Drop your audio or video file. We support MP3, WAV, MP4 and more formats up to 25MB.",
    color: "from-brand/20 to-brand/5",
    iconBg: "bg-brand/15",
    iconColor: "text-brand",
  },
  {
    icon: Globe,
    title: "Choose Language",
    description:
      "Select your target language. Our AI transcribes, translates, and synthesizes natural-sounding speech.",
    color: "from-lime/20 to-lime/5",
    iconBg: "bg-lime/15",
    iconColor: "text-lime",
  },
  {
    icon: Download,
    title: "Download",
    description:
      "Preview your dubbed content in the built-in player and download the final result instantly.",
    color: "from-green-500/20 to-green-500/5",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Three simple steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: i * 0.1,
              }}
              className="group"
            >
              <div
                className={`relative bg-gradient-to-b ${step.color} rounded-3xl p-8 border border-border/30 h-full hover:border-border/60 transition-colors`}
              >
                <div className="text-6xl font-bold text-foreground/5 absolute top-4 right-6">
                  {i + 1}
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6`}
                >
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
