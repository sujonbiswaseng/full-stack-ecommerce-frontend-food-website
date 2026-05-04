'use client'
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button structure

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
    <section
      className="
        w-full flex justify-center items-center
        min-h-[300px] py-8 px-4
        bg-card rounded-xl border border-border
        transition
        animate-fade-up
      "
      // Multi-theme: uses only design tokens from global.css
    >
      <motion.div
        className="flex flex-col items-center max-w-md text-center gap-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <span
          className="text-6xl md:text-7xl drop-shadow-lg select-none mb-2"
          aria-hidden="true"
        >
          {emoji ?? "😔"}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-card-foreground">
          {content}
        </h3>
        {filter && (
          <p className="text-muted-foreground text-base font-medium">
            {filter}
          </p>
        )}
        {btntext && path && (
          <Link href={path} >
            <Button
              asChild
              size="lg"
              className="
                mt-4
                gap-2
                w-fit
                px-6 py-2
                rounded-lg
                shadow
                focus-visible:ring-2 focus-visible:ring-ring
                transition
                "
            >
              <span>
                <span className="mr-1" aria-hidden="true">🚀</span>
                {btntext}
              </span>
            </Button>
          </Link>
        )}
      </motion.div>
    </section>
  );
};

export default Notfounddata;
