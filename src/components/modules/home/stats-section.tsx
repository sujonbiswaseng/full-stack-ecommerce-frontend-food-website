"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ChefHat, Star, Truck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    display: "50K+",
    label: "Happy Customers",
    description: "Satisfied food lovers",
  },
  {
    icon: ChefHat,
    value: 200,
    display: "200+",
    label: "Expert Chefs",
    description: "Professional cooks",
  },
  {
    icon: Star,
    value: 4.8,
    display: "4.8",
    label: "Average Rating",
    description: "Customer satisfaction",
    isDecimal: true,
  },
  {
    icon: Truck,
    value: 99,
    display: "99%",
    label: "On-Time Delivery",
    description: "Reliable service",
    suffix: "%",
  },
];

function AnimatedCounter({
  value,
  display,
  isDecimal,
  suffix,
}: {
  value: number;
  display: string;
  isDecimal?: boolean;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {inView ? formatted : "0"}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FoodHub for their
            daily meals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={cardVariants}>
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    display={stat.display}
                    isDecimal={stat.isDecimal}
                    suffix={stat.suffix}
                  />
                  {!stat.isDecimal && !stat.suffix && "+"}
                </div>
                <div className="text-sm font-semibold text-card-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}