"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Thank you for subscribing!");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-[1440px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on new dishes, exclusive offers, and culinary
            trends delivered to your inbox.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex gap-3"
          >
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground text-primary placeholder:text-primary/60 border-0 flex-1"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="shrink-0 px-6"
            >
              {isLoading ? "Subscribing…" : "Subscribe"}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}