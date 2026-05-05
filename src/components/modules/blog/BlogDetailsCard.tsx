"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { TResponseBlog } from "@/types/blog.type";
import { TResponseUserData } from "@/types/user.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export function BlogDetailsCard({
  blog,
}: {
  blog: TResponseBlog<{ author: TResponseUserData }>;
}) {
  const images = blog.images?.length ? blog.images : ["/placeholder.png"];
  const [activeImage, setActiveImage] = useState(images[0]);
  const formattedDate = useMemo(() => {
    return new Date(blog.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [blog.createdAt]);

  return (
    <section
      className="bg-background min-h-[calc(100dvh-5rem)] py-8"
      aria-labelledby="blog-title"
    >
      <div className="container max-w-[1440px] mx-auto w-full px-4 flex justify-center">
        <motion.article
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col min-h-[68vh] rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-8 w-full">
            {/* Image Gallery Section */}
            <div className="flex flex-col gap-6 border-b border-border lg:border-b-0 lg:border-r bg-card justify-center p-6 lg:p-8 min-h-[20rem]">
              <div className="relative flex items-center justify-center aspect-[4/4.6] min-h-[16rem] rounded-2xl border border-border bg-muted overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    className="w-full h-full relative"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Image
                      src={activeImage}
                      alt={blog.title}
                      fill
                      loading="eager"
                      priority
                      className="object-cover select-none"
                      sizes="(max-width:1024px) 100vw, 40vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute top-4 left-4 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur-md focus:outline-none">
                  Featured Article
                </span>
              </div>
              <div
                className="flex gap-4 w-full flex-wrap mt-2"
                aria-label="gallery thumbnails"
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={`Show image ${idx + 1}`}
                    className={[
                      "group relative h-14 w-14 rounded-xl border overflow-hidden flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      img === activeImage
                        ? "border-primary ring-2 ring-primary"
                        : "border-border hover:border-primary hover:ring-primary/10",
                    ].join(" ")}
                    tabIndex={0}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Blog Details Section */}
            <div className="flex flex-col min-h-[20rem] bg-card px-6 py-8 md:p-8">
              <motion.div
                variants={stagger}
                initial="visible"
                animate="visible"
                className="flex flex-col h-full"
              >
                <CardHeader className="px-0 pb-4">
                  <motion.span
                    variants={fadeUp}
                    className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
                  >
                    Modern SaaS Blog
                  </motion.span>
                  <motion.h1
                    id="blog-title"
                    variants={fadeUp}
                    className="mt-1 text-2xl md:text-4xl font-bold leading-tight tracking-tight text-card-foreground"
                  >
                    {blog.title}
                  </motion.h1>
                  <motion.div
                    variants={fadeUp}
                    className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" aria-label="Published date" />
                      <span>{formattedDate}</span>
                    </span>
                  </motion.div>
                </CardHeader>
                <CardContent className="px-0 flex flex-col gap-8">
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center bg-background border border-border rounded-2xl p-4 gap-4"
                  >
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border">
                      <Link
                        href={blog.author.id}
                        tabIndex={-1}
                        aria-label={`${blog.author.name}'s Profile`}
                      >
                        <Image
                          src={blog.author.image || "/placeholder.png"}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="font-medium text-card-foreground text-base truncate"
                        title={blog.author.name}
                      >
                        {blog.author.name}
                      </span>
                      <span
                        className="text-xs text-muted-foreground truncate"
                        title={blog.author.email}
                      >
                        {blog.author.email}
                      </span>
                      {blog.author.phone && (
                        <span
                          className="text-xs text-muted-foreground truncate"
                          title={blog.author.phone}
                        >
                          {blog.author.phone}
                        </span>
                      )}
                      <span
                        className={[
                          "inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[11px] font-medium border",
                          blog.author.isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border",
                        ].join(" ")}
                        aria-label={blog.author.isActive ? "Active user" : "Inactive user"}
                      >
                        {blog.author.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeUp} className="">
                    <CardTitle className="text-lg font-semibold text-foreground mb-1">Overview</CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-7 mt-3">
                      {blog.content}
                    </CardDescription>
                  </motion.div>
                </CardContent>
                <CardFooter className="px-0 pt-8 mt-auto border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-0.5">
                      Continue Reading
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore the complete story and full details.
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      stiffness: 350,
                      damping: 22,
                    }}
                    className="inline-flex"
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      tabIndex={0}
                      aria-label="Explore Now"
                      passHref
                    >
                      <Button
                        variant="default"
                        className="rounded-full px-7 py-3 text-sm font-semibold"
                      >
                        Explore Now
                      </Button>
                    </Link>
                  </motion.div>
                </CardFooter>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
