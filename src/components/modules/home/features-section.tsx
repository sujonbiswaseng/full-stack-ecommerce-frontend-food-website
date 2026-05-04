"use client";

import { motion } from "framer-motion";
import { ChefHat, Clock, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our professional chefs craft each dish with passion and precision using the finest ingredients.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Get your favorite meals delivered hot and fresh within 30 minutes of ordering.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "Every meal undergoes strict quality checks to ensure the highest standards.",
  },
  {
    icon: Truck,
    title: "Reliable Service",
    description:
      "Count on us for consistent, dependable delivery service every time you order.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 max-w-[1440px] mx-auto">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Why Choose FoodHub?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Experience the perfect blend of quality, speed, and reliability in
          every meal
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={cardVariants}>
            <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}