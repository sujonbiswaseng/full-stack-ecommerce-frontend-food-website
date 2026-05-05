"use client";

import { motion, Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";

const faqs = [
  {
    question: "How does the ordering process work?",
    answer:
      "Simply browse our menu, select your favorite dishes, add them to cart, and checkout. We'll prepare and deliver your order within 30 minutes.",
  },
  {
    question: "What are your delivery hours?",
    answer:
      "We deliver from 10 AM to 10 PM daily. During peak hours (12 PM - 2 PM and 7 PM - 9 PM), delivery might take up to 45 minutes.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We stand by our quality. If you're not satisfied with your order, contact us within 30 minutes of delivery for a full refund or replacement.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "Yes! Many dishes can be customized. Check the item details for customization options or contact the provider directly.",
  },
  {
    question: "Is there a minimum order amount?",
    answer:
      "Our minimum order amount is $15. This helps us maintain quality and efficiency in our service.",
  },
  {
    question: "How do I become a provider?",
    answer:
      "Contact us through our provider registration form. We'll review your application and get you started with our platform.",
  },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

function FAQSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, idx) => (
        <Card className="bg-card border border-border rounded-xl w-full" key={idx}>
          <CardContent className="p-6 flex flex-col gap-2">
            <Skeleton className="h-6 w-2/3 bg-input rounded" />
            <Skeleton className="h-4 w-full bg-input rounded mt-2" />
            <Skeleton className="h-4 w-5/6 bg-input rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FAQSection({ loading = false }: { loading?: boolean }) {
  return (
    <section
      className="w-full bg-background border-t border-border"
      aria-labelledby="faq-section-heading"
      tabIndex={-1}
    >
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUpVariants}
          className="w-full text-center mb-8"
        >
          <h2
            id="faq-section-heading"
            className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl text-center text-base md:text-lg text-muted-foreground mt-2 mx-auto">
            Find answers to common questions about our service
          </p>
        </motion.div>
        <div className="w-full max-w-3xl mx-auto">
          {loading ? (
            <FAQSkeleton />
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeUpVariants}
              className="w-full"
            >
              <Accordion
                type="single"
                collapsible
                className="w-full bg-card rounded-xl border border-border"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border last:border-0"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-card-foreground transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}