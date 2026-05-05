"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function CTASection() {
  return (
    <section
      className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 border-t border-border"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden bg-card rounded-2xl w-full max-w-xl md:max-w-2xl mx-auto p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg border border-border"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4 border border-accent/30">
              <UtensilsCrossed
                className="w-7 h-7 text-accent"
                aria-hidden="true"
              />
            </div>
            <h2
              id="cta-heading"
              className="text-2xl md:text-4xl font-bold text-card-foreground tracking-tight mb-2"
            >
              Ready to Experience Amazing Food?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6">
              Join thousands of satisfied customers and discover your new favorite dishes today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row w-full max-w-md mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto font-semibold"
              >
                <Link
                  href="/meals"
                  tabIndex={0}
                  aria-label="Order Meals"
                >
                  <span className="flex items-center justify-center">
                    Order Now
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto font-semibold"
              >
                <Link
                  href="/provider/dashboard/create-meals"
                  tabIndex={0}
                  aria-label="Create Meal"
                >
                  <span className="capitalize">Create Meal</span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}