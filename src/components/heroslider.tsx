"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Miso Soup",
    subtitle: "Classic Japanese soup made with miso paste, tofu, and seaweed.",
    image: "https://images.pexels.com/photos/13065217/pexels-photo-13065217.jpeg",
  },
  {
    id: 2,
    title: "Chicken Roast",
    subtitle: "Traditional Bangladeshi style roasted chicken cooked with aromatic spices and rich gravy.",
    image: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg",
  },
  {
    id: 3,
    title: "Kacchi Biryani",
    subtitle: "Fragrant basmati rice layered with tender marinated mutton and authentic spices.",
    image: "https://images.pexels.com/photos/4439740/pexels-photo-4439740.jpeg",
  },
  {
    id: 4,
    title: "Pizza",
    subtitle: "Freshly baked Italian pizza topped with cheese, sauce, and delicious toppings.",
    image: "https://images.pexels.com/photos/31596394/pexels-photo-31596394.jpeg",
  },
];

const SLIDE_INTERVAL = 6000;

// Skeleton for loading state, using production color tokens and premium card styling
function HeroSlideSkeleton() {
  return (
    <motion.div
      aria-label="Loading hero slide"
      className="flex flex-col h-full w-full justify-end md:justify-center relative z-20"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="w-full max-w-2xl lg:max-w-3xl mx-auto rounded-2xl p-6 bg-card border border-border shadow-xl animate-pulse flex flex-col gap-6 lg:gap-8 min-h-[340px]">
        <div className="h-40 w-full bg-input rounded-xl mb-2" />
        <div className="h-7 w-1/2 bg-input rounded mb-2" />
        <div className="h-5 w-4/5 bg-input rounded mb-1" />
        <div className="h-4 w-2/3 bg-input rounded mb-4" />
        <div className="flex gap-4 pt-2">
          <div className="h-10 w-32 rounded-full bg-input" />
          <div className="h-10 w-32 rounded-full bg-input" />
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const changeRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Slide auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Premium skeleton UX
  useEffect(() => {
    setIsLoading(true);
    if (changeRef.current) clearTimeout(changeRef.current);
    changeRef.current = setTimeout(() => setIsLoading(false), 320);
    return () => {
      if (changeRef.current) clearTimeout(changeRef.current);
    };
  }, [current]);

  // Touch swipe gesture
  useEffect(() => {
    if (touchStart === null || touchEnd === null) return;
    const threshold = 44;
    if (touchStart - touchEnd > threshold) nextSlide();
    else if (touchEnd - touchStart > threshold) prevSlide();
    // eslint-disable-next-line
  }, [touchEnd]);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevSlide, nextSlide]);

  // --- RENDER ---
  return (
    <section
      className={cn(
        "relative w-full min-h-[60vh] md:min-h-[65vh] max-h-[700px] h-[65vh] bg-background select-none overflow-hidden"
      )}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Hero slider"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
      onTouchEnd={() => {
        setTouchStart(null);
        setTouchEnd(null);
      }}
    >
      {/* Container for centering and limiting width */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto z-10 flex items-stretch justify-center">
        {/* -- SLIDE LAYER -- */}
        <AnimatePresence initial={false} mode="wait">
          {!isLoading ? (
            <motion.article
              key={slides[current].id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.32,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              aria-roledescription="slide"
              aria-label={slides[current].title}
              className="absolute inset-0 w-full h-full flex items-end md:items-center"
            >
              {/* HERO BACKGROUND IMAGE */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover w-full h-full select-none"
                  quality={72}
                  draggable={false}
                  aria-hidden
                />
                {/* darken using background color variable */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(var(--background-rgb), 0.64)" }}
                  aria-hidden="true"
                />
              </div>
              {/* CONTENT CARD */}
              <div className="w-full flex justify-center items-end md:items-center h-full px-4 md:px-8">
                <motion.div
                  className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-card/90 border border-border rounded-2xl shadow-xl p-6 flex flex-col gap-6 lg:gap-8 min-h-[340px] transition-colors"
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  tabIndex={0}
                >
                  <div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-card-foreground leading-snug mb-2 tracking-tight">
                      {slides[current].title}
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg lg:text-xl font-medium">
                      {slides[current].subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2 mt-auto">
                    <Button
                      size="lg"
                      className={cn(
                        "h-12 px-8 rounded-full font-semibold text-base lg:text-lg min-w-[128px] md:min-w-[156px] bg-primary text-primary-foreground shadow-md border border-primary/60 focus-visible:ring-2 ring-primary transition-transform active:scale-95"
                      )}
                      onClick={() => router.push("/cart")}
                      variant="default"
                    >
                      Order Now
                    </Button>
                    <Button
                      size="lg"
                      className={cn(
                        "h-12 px-8 rounded-full font-semibold text-base lg:text-lg min-w-[128px] md:min-w-[156px] border border-border bg-background text-foreground hover:bg-accent/60 hover:text-accent-foreground transition-colors focus-visible:ring-2 ring-accent"
                      )}
                      onClick={() => router.push("/meals")}
                      variant="ghost"
                    >
                      View Menu
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.article>
          ) : (
            <HeroSlideSkeleton key={`skeleton-${slides[current].id}`} />
          )}
        </AnimatePresence>

        {/* CONTROLS (LEFT/RIGHT) */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between z-30 px-4 pointer-events-none">
          <Button
            variant="ghost"
            aria-label="Previous Slide"
            onClick={prevSlide}
            tabIndex={0}
            className="pointer-events-auto rounded-full p-2 h-12 w-12 md:h-14 md:w-14 bg-card border border-border hover:bg-accent/80 focus-visible:ring-2 ring-primary text-card-foreground transition-colors shadow"
          >
            <span className="sr-only md:not-sr-only" aria-hidden>
              &larr;
            </span>
          </Button>
          <Button
            variant="ghost"
            aria-label="Next Slide"
            onClick={nextSlide}
            tabIndex={0}
            className="pointer-events-auto rounded-full p-2 h-12 w-12 md:h-14 md:w-14 bg-card border border-border hover:bg-accent/80 focus-visible:ring-2 ring-primary text-card-foreground transition-colors shadow"
          >
            <span className="sr-only md:not-sr-only" aria-hidden>
              &rarr;
            </span>
          </Button>
        </div>

        {/* PAGINATION DOTS */}
        <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center items-center gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={current === idx}
              tabIndex={0}
              onClick={() => setCurrent(idx)}
              className={cn(
                "transition-all outline-none border border-input focus-visible:ring-2 ring-primary rounded-full",
                current === idx
                  ? "bg-primary w-7 h-3.5"
                  : "bg-input w-3.5 h-3.5 hover:bg-accent transition-colors"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}