"use client";

import { motion } from "framer-motion";
import { Heart, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicStats } from "@/types/stats.type";

type StatItem = {
  label: string;
  value: number;
};

function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <Card
          key={item.label}
          className="flex flex-col items-center py-6 px-4 bg-card border border-border transition-all hover:ring-2 hover:ring-accent min-h-[148px]"
        >
          <CardTitle className="text-2xl font-semibold text-primary mb-1" aria-label={item.label}>
            {item.value.toLocaleString()}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">{item.label}</CardDescription>
        </Card>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className="flex flex-col items-center py-6 px-4 bg-card min-h-[148px]"
        >
          <Skeleton className="w-14 h-8 mb-2 bg-muted" />
          <Skeleton className="w-20 h-4 bg-muted" />
        </Card>
      ))}
    </div>
  );
}

const VALUES = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We believe in serving only the highest quality food, prepared with care and attention to detail.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building connections between food lovers, chefs, and communities is at the heart of our mission.",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for excellence in every aspect, from food quality to customer service and technology.",
  },
];

export default function AboutContent({ data }: { data: PublicStats }) {
  // Stat grid composition, order and labels
  const stats: StatItem[] = [
    { label: "Customers", value: data.totalCustomer ?? 0 },
    { label: "Partner Providers", value: data.totalprovider ?? 0 },
    { label: "Meals Served", value: data.totalmeals ?? 0 },
    { label: "Reviews", value: data.totalReviews ?? 0 },
    { label: "Total Admins", value: data.totalAdmins ?? 0 },
    { label: "Total Orders", value: data.totalorders ?? 0 },
    { label: "Categories", value: data.totalcategory ?? 0 },
    { label: "Newsletter Subs", value: data.totalNewsletters ?? 0 },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border">
        <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-16 md:py-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full text-center"
          >
            <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
              About Bitebase
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting food lovers with passionate chefs and restaurants, creating memorable dining experiences through technology and heart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section className="w-full">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-8 px-4 md:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Our Story
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                BiteBase was born from a simple idea: great food should be accessible to everyone. Founded in 2024, we've been working to bridge the gap between exceptional chefs and food enthusiasts.
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                Our platform empowers local restaurants and home chefs to showcase their culinary talents while providing customers with a seamless ordering experience.
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                Today, we're proud to serve thousands of satisfied customers and partner with hundreds of talented food creators across the region.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full"
            >
              <div className="h-full flex flex-col justify-center">
                {data ? <StatsGrid stats={stats} /> : <StatsSkeleton />}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-muted/40 w-full">
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-2"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              Our Values
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col group transition-shadow hover:shadow-lg border border-border bg-card">
                  <CardHeader className="flex flex-col items-center gap-2 py-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <value.icon className="w-7 h-7 text-primary" aria-hidden />
                    </div>
                    <CardTitle className="text-lg md:text-xl text-card-foreground mb-0.5">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}