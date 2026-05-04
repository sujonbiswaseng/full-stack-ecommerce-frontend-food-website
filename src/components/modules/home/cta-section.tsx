"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 px-4 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-primary rounded-2xl p-8 md:p-14 text-center text-primary-foreground"
      >
        {/* Decorative blobs */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10">
          <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-primary-foreground/85 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover your new favorite
            dishes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary font-semibold">
              <Link href="/meals">
                Order Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/register">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}