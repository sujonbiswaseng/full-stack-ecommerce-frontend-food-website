"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  CreditCard,
  UserCircle,
  Store,
  Search,
  Mail,
} from "lucide-react";
import Link from "next/link";

type HelpCategory = "All" | "Orders" | "Payments" | "Account" | "Providers";

const helpCategories: { key: HelpCategory; icon: React.ElementType; color: string }[] = [
  { key: "All", icon: Search, color: "text-primary" },
  { key: "Orders", icon: ShoppingBag, color: "text-primary" },
  { key: "Payments", icon: CreditCard, color: "text-primary" },
  { key: "Account", icon: UserCircle, color: "text-primary" },
  { key: "Providers", icon: Store, color: "text-primary" },
];

const faqs: { category: Exclude<HelpCategory, "All">; question: string; answer: string }[] = [
  {
    category: "Orders",
    question: "How do I place an order?",
    answer:
      "Browse the Meals page, add items to your cart, then proceed to checkout. Select your delivery address and payment method, then confirm your order.",
  },
  {
    category: "Orders",
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 5 minutes of placing it. After that, the kitchen has already started preparing your food. Contact support immediately if you need to make changes.",
  },
  {
    category: "Orders",
    question: "How do I track my order?",
    answer:
      "Visit My Orders in your dashboard. You'll see real-time status updates: Confirmed → Preparing → Out for Delivery → Delivered.",
  },
  {
    category: "Payments",
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, and online bank transfers via Stripe. All transactions are secured with industry-standard encryption.",
  },
  {
    category: "Payments",
    question: "How do I get a refund?",
    answer:
      "If you're unsatisfied with your order, contact us within 30 minutes of delivery. Refunds are processed back to your original payment method within 3–5 business days.",
  },
  {
    category: "Payments",
    question: "Is my payment information secure?",
    answer:
      "Yes. BiteBase uses Stripe for payment processing — we never store your card details on our servers. All data is encrypted with TLS.",
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a secure reset link within a few minutes.",
  },
  {
    category: "Account",
    question: "How do I update my profile?",
    answer:
      "Go to your Dashboard → Profile. You can update your name, email, phone number, and profile photo from there.",
  },
  {
    category: "Account",
    question: "Can I have multiple addresses?",
    answer:
      "Currently each account supports one default delivery address, which can be updated anytime before checkout.",
  },
  {
    category: "Providers",
    question: "How do I become a food provider?",
    answer:
      "Register with a Provider account during sign-up, or contact us at dev.sujonbiswas@gmail.com. We'll review your application and activate your provider profile within 24 hours.",
  },
  {
    category: "Providers",
    question: "How do I add or manage my meals?",
    answer:
      "Log in to your Provider Dashboard. From there you can add new meals, update prices, toggle availability, and manage your full menu.",
  },
  {
    category: "Providers",
    question: "When do I receive payments?",
    answer:
      "Provider payouts are processed weekly. Earnings from confirmed and delivered orders are transferred to your registered bank account every Monday.",
  },
];

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState<HelpCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Help &amp; Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions or reach out to our support team.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="help-search"
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {helpCategories.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {key}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-4 bg-card"
                >
                  <AccordionTrigger className="text-left text-card-foreground hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {faq.category}
                      </Badge>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </motion.div>

        {/* Still need help? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <div className="w-14 h-14 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Still need help?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Our support team is available Mon-Fri, 9AM–6PM. We typically respond
            within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="mailto:dev.sujonbiswas@gmail.com">
                Email Us Directly
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
