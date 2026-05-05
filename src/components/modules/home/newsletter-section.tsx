"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { createNewsletterAction } from "@/actions/newsletter.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Subscribing...");
    setIsLoading(true);
    const res = await createNewsletterAction({ email });
    if (res?.success) {
      toast.success("You've been subscribed!", { id: toastId });
    } else {
      toast.error(res?.message || "Subscription failed. Please try again.", { id: toastId });
    }
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section
      className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 border-t border-border px-4 py-16"
      aria-labelledby="newsletter-section-heading"
    >
      <div className="max-w-[1440px] mx-auto w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl md:max-w-2xl"
        >
          <Card className="bg-card/80 border border-border rounded-2xl shadow-lg px-6 md:px-8 py-8 flex flex-col items-center text-center gap-6">
            <span
              aria-hidden="true"
              className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2"
            >
              <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
            </span>
            <h2
              id="newsletter-section-heading"
              className="text-2xl md:text-4xl font-bold text-card-foreground tracking-tight"
            >
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-2">
              Get the latest updates on new dishes, exclusive offers, and culinary trends delivered to your inbox.
            </p>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.3, delay: 0.07, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md mx-auto"
              aria-label="Newsletter subscription form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-input text-foreground placeholder:text-muted-foreground border border-input focus-visible:ring-2 focus-visible:ring-ring transition-all w-full"
                required
                autoComplete="email"
                disabled={isLoading}
              />
              <Button
                type="submit"
                
                disabled={isLoading || !email}
                className="w-full sm:w-auto font-semibold transition-colors"
                aria-busy={isLoading}
                aria-label={isLoading ? "Subscribing" : "Subscribe"}
              >
                {isLoading ? "Subscribing…" : "Subscribe"}
              </Button>
            </motion.form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}