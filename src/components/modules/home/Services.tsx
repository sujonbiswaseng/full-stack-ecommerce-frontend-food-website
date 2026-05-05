"use client";

import * as React from "react";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

const defaultServicesData: ServiceItem[] = [
  {
    icon: "🧩",
    title: "food Platform Development",
    description: "Build modern food ordering platforms with scalable architecture and exceptional user experience.",
  },
  {
    icon: "📊",
    title: "Admin Dashboard Systems",
    description: "Create data-driven dashboards for organizer operations, finance, and reporting.",
  },
  {
    icon: "🤖",
    title: "AI Automation Services",
    description: "Implement AI flows for attendee support, notifications, and smart follow-ups.",
  },
  {
    icon: "🔐",
    title: "Security & Access Control",
    description: "Set up role-based access, protected workflows, and secure session management.",
  },
  {
    icon: "⚙️",
    title: "API & Integration Services",
    description: "Connect payment gateways, CRM tools, analytics, and third-party platforms.",
  },
  {
    icon: "🚀",
    title: "Performance Optimization",
    description: "Improve speed, stability, and responsiveness for production-grade experiences.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design Systems",
    description: "Deliver cohesive design systems for consistent, reusable enterprise interfaces.",
  },
  {
    icon: "🛠️",
    title: "Maintenance & Support",
    description: "Provide continuous updates, bug fixes, and feature enhancements after launch.",
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 4px 28px 0 var(--tw-shadow-color)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      tabIndex={0}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all rounded-2xl bg-card border border-border flex flex-col h-full relative group"
      aria-labelledby={`service-title-${service.title.replace(/\s/g, "").toLowerCase()}`}
      role="region"
    >
      <CardHeader className="flex flex-col items-center justify-center gap-4 p-6 pb-0 bg-card">
        <span
          className="text-4xl select-none mb-2 bg-accent/50 rounded-lg flex items-center justify-center w-14 h-14"
          aria-label={`${service.icon} icon`}
        >
          {service.icon}
        </span>
        <CardTitle
          id={`service-title-${service.title.replace(/\s/g, "").toLowerCase()}`}
          className="text-xl md:text-2xl font-semibold text-card-foreground text-center"
        >
          {service.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-center text-base mt-1">
          {service.description}
        </CardDescription>
      </CardHeader>
     
    </motion.div>
  );
}

function ServicesSkeleton() {
  return (
    <div
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Loading service cards"
    >
      {[...Array(4)].map((_, idx) => (
        <Card
          key={idx}
          className="bg-card border border-border rounded-2xl flex flex-col h-full"
        >
          <CardHeader className="flex flex-col items-center justify-center gap-4 p-6 pb-0">
            <Skeleton className="w-14 h-14 rounded-lg mb-2 bg-accent/30" />
            <Skeleton className="w-3/4 h-6 rounded bg-input" />
            <Skeleton className="w-5/6 h-4 rounded mt-1 bg-input" />
          </CardHeader>
          <CardContent className="flex flex-grow justify-center items-end p-6 pt-4">
            <Skeleton className="w-full h-9 rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const Services = ({
  data = defaultServicesData,
  loading = false,
}: {
  data?: ServiceItem[];
  loading?: boolean;
}) => (
  <section
    id="services"
    className="w-full bg-background border-t border-border"
    aria-labelledby="saas-services-heading"
  >
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 flex flex-col items-center">
      <header className="flex flex-col gap-4 items-center w-full">
        <div className="flex items-center gap-2">
        
          <h2
            id="saas-services-heading"
            className="text-3xl md:text-4xl font-bold text-foreground tracking-tight"
          >
            Services We Provide
          </h2>
        </div>
        <p className="max-w-2xl text-center text-base md:text-lg text-muted-foreground mt-2">
          End-to-end services designed to launch, scale, and optimize modern event and SaaS products.
        </p>
      </header>

      <div className="w-full mt-8">
        {loading ? (
          <ServicesSkeleton />
        ) : (
          <motion.div
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence>
              {data.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  </section>
);

export default Services;