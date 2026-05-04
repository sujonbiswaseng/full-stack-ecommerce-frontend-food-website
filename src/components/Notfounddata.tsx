"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NotfounddataProps {
  content: string;
  filter?: string;
  emoji?: React.ReactNode;
  path?: string;
  btntext?: string;
}

const Notfounddata: React.FC<NotfounddataProps> = ({
  content,
  filter,
  emoji,
  path,
  btntext,
}) => {
  return (
    <section className="w-full flex justify-center items-center min-h-[300px] px-4 py-8 md:py-12 bg-card rounded-xl border border-border transition max-w-[1440px] mx-auto">
      <motion.div
        className="flex flex-col items-center max-w-md w-full text-center gap-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0.1, 0.2, 1] }}
      >
        <span
          className="text-7xl md:text-8xl drop-shadow-lg select-none mb-2"
          aria-hidden="true"
        >
          {emoji ?? "😔"}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-card-foreground leading-tight">
          {content}
        </h3>
        {filter && (
          <p className="text-base md:text-lg font-medium text-muted-foreground">
            {filter}
          </p>
        )}
        {btntext && path && (
          <Button
          variant={'default'}
            asChild
            size="lg"
            className="mt-4 gap-2 w-full sm:w-auto px-6 py-2 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-ring transition"
          >
            <Link href={path}>
              <span className="flex items-center justify-center">
                <span className="mr-2" aria-hidden="true">
                  🚀
                </span>
                {btntext}
              </span>
            </Link>
          </Button>
        )}
      </motion.div>
    </section>
  );
};

export default Notfounddata;
