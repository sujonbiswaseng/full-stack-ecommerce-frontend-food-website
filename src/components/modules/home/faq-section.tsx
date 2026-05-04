"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the ordering process work?",
    answer: "Simply browse our menu, select your favorite dishes, add them to cart, and checkout. We'll prepare and deliver your order within 30 minutes."
  },
  {
    question: "What are your delivery hours?",
    answer: "We deliver from 10 AM to 10 PM daily. During peak hours (12 PM - 2 PM and 7 PM - 9 PM), delivery might take up to 45 minutes."
  },
  {
    question: "Do you offer refunds?",
    answer: "We stand by our quality. If you're not satisfied with your order, contact us within 30 minutes of delivery for a full refund or replacement."
  },
  {
    question: "Can I customize my order?",
    answer: "Yes! Many dishes can be customized. Check the item details for customization options or contact the provider directly."
  },
  {
    question: "Is there a minimum order amount?",
    answer: "Our minimum order amount is $15. This helps us maintain quality and efficiency in our service."
  },
  {
    question: "How do I become a provider?",
    answer: "Contact us through our provider registration form. We'll review your application and get you started with our platform."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 px-4 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find answers to common questions about our service
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}