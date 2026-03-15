"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#624AFF20_0%,transparent_70%)]" />
      <motion.div
        className="relative max-w-3xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to dub
          <br />
          your first file?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          Start dubbing for free — no credit card required. Upload your file and
          get results in minutes.
        </p>
        <Link href="/dubbing">
          <Button
            size="lg"
            className="bg-brand hover:bg-brand-light rounded-full px-10 h-14 text-lg font-semibold"
          >
            Start Dubbing Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
