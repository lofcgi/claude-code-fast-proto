"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How accurate is the AI transcription?",
    a: "Our transcription engine achieves 99.2% accuracy across supported languages. It handles accents, background noise, and multiple speakers with advanced noise reduction and speaker diarization.",
  },
  {
    q: "What file formats are supported?",
    a: "We support all major audio and video formats including MP3, WAV, MP4, MOV, AVI, FLAC, and AAC. Files up to 25MB can be uploaded directly, with larger files supported via our API.",
  },
  {
    q: "How long does dubbing take?",
    a: "Most files are processed in under 2 minutes. A 10-minute video typically takes 60-90 seconds to transcribe, translate, and synthesize in a new language. Batch processing is available for larger volumes.",
  },
  {
    q: "Can I customize the AI voice?",
    a: "Yes! Choose from 50+ voice styles across different genders, ages, and tones. Our Voice Cloning feature can also match the original speaker's voice characteristics in the target language.",
  },
  {
    q: "Is there an API for bulk processing?",
    a: "Absolutely. Our REST API supports batch uploads, webhook callbacks, and custom voice configurations. Enterprise plans include dedicated infrastructure for high-volume processing with priority queue access.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand mb-4">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Frequently asked
            <br />
            questions
          </h2>
        </motion.div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className="border-b border-border/30"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: i * 0.05,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
              >
                <span className="text-lg font-medium pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pb-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
