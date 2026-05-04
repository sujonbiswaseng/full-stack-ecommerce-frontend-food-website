"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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

// Arrow SVG (accessible)
const Arrow = ({
  direction,
  ...props
}: { direction: "left" | "right"; className?: string; onClick?: () => void }) => (
  <button
    type="button"
    aria-label={direction === "left" ? "Previous Slide" : "Next Slide"}
    className={`
      group
      bg-card text-card-foreground 
      border border-border
      rounded-full
      shadow-md
      w-10 h-10
      flex items-center justify-center
      absolute top-1/2 z-40
      -translate-y-1/2
      transition-smooth
      hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-2
      focus-visible:ring-ring
      ${direction === "left" ? "left-4 md:left-8" : "right-4 md:right-8"}
    `}
    tabIndex={0}
    {...props}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path
          d="M13 16l-5-5 5-5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 4l5 5-5 5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  </button>
);

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const slideCount = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 6000);

    return () => clearInterval(timer);
  }, [slideCount]);

  // Handlers for arrows
  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };
  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <section
      className="
        relative w-full h-[70vh] min-h-[420px] max-h-[540px] bg-background
        flex items-center
        overflow-hidden
      "
      aria-label="Hero slider"
    >
      {/* Slide arrows */}
      <Arrow direction="left" onClick={goPrev} />
      <Arrow direction="right" onClick={goNext} />

      {/* Slides */}
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} mode="wait">
          {slides.map((slide, index) =>
            index === current ? (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.98, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -16 }}
                transition={{ duration: 0.32, ease: [0.4, 0.1, 0.2, 1] }}
                className="
                  absolute inset-0 z-20
                  w-full h-full
                "
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.title} - ${slide.subtitle}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover object-center transition-smooth"
                    sizes="(max-width: 768px) 100vw, 1480px"
                  />
                  <div className="absolute inset-0 bg-background/80 dark:bg-background/70" />
                </div>
                {/* Card Content */}
                <div className="relative z-30 h-full flex items-center justify-center px-4">
                  <div className="max-w-[1440px] mx-auto w-full">
                    <div
                      className="
                        bg-card bg-opacity-80 backdrop-blur-md
                        rounded-lg
                        shadow-lg
                        p-6 sm:p-8
                        max-w-xl mx-auto
                        flex flex-col items-start
                        gap-4 sm:gap-6
                        transition-smooth
                      "
                    >
                      <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground drop-shadow-sm">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-muted-foreground font-medium">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button
                          onClick={() => router.push("/cart")}
                          className="
                            btn-primary
                            min-w-[130px] sm:min-w-[160px]
                            h-12 px-6 font-semibold
                            transition-smooth
                            shadow
                            hover:bg-primary/90
                            active:scale-98
                            focus-visible:ring-2
                            focus-visible:ring-ring
                          "
                        >
                          Order Now
                        </button>
                        <button
                          onClick={() => router.push("/meals")}
                          className="
                            btn-secondary
                            min-w-[130px] sm:min-w-[160px]
                            h-12 px-6 font-semibold
                            border border-border
                            transition-smooth
                            hover:bg-secondary hover:text-secondary-foreground
                            focus-visible:ring-2 focus-visible:ring-ring
                          "
                        >
                          View Menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              w-3 h-3 rounded-full
              transition-smooth
              border border-border
              focus-visible:ring-2 focus-visible:ring-ring
              ${current === index ? "bg-primary" : "bg-muted border border-border"}
            `}
          />
        ))}
      </div>
    </section>
  );
}