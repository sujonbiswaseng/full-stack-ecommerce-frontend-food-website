"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    heading: "Products",
    links: [
      { href: "/meals", label: "Browse Meals" },
      { href: "/providers", label: "Providers" },
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ],
  },
  {
    heading: "For Customers",
    links: [
      { href: "/cart", label: "Cart" },
      { href: "/orders", label: "My Orders" },
      { href: "/profile/user", label: "Profile" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
  {
    heading: "For Providers",
    links: [
      { href: "/provider/dashboard", label: "Dashboard" },
      { href: "/provider/dashboard/my-menu", label: "Manage Menu" },
      { href: "/provider/dashboard/orders", label: "Orders" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { email: "dev.sujonbiswas@gmail.com", label: "dev.sujonbiswas@gmail.com" },
      { phone: "+880 1788477912", label: "+880 1788477912" },
      { location: "Sylhet, Bangladesh", label: "Sylhet, Bangladesh" },
    ],
  },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: any[];
}) {
  return (
    <div className="flex flex-col gap-4 min-w-[180px]">
      <h3 className="text-xs font-semibold text-foreground">{heading}</h3>
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
        {links.map((link, i) => {
          if (link.href)
            return (
              <li key={i}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            );
          if (link.email)
            return (
              <li
                key={i}
                className="break-all transition-colors hover:text-primary cursor-pointer"
                tabIndex={0}
                aria-label={`Email: ${link.label}`}
                onClick={() => window.open(`mailto:${link.label}`)}
                onKeyDown={e => {
                  if (e.key === "Enter") window.open(`mailto:${link.label}`);
                }}
              >
                {link.label}
              </li>
            );
          if (link.phone)
            return (
              <li
                key={i}
                className="transition-colors hover:text-primary cursor-pointer"
                tabIndex={0}
                aria-label={`Phone: ${link.label}`}
                onClick={() => window.open(`tel:${link.label.replace(/\s/g, "")}`)}
                onKeyDown={e => {
                  if (e.key === "Enter") window.open(`tel:${link.label.replace(/\s/g, "")}`);
                }}
              >
                {link.label}
              </li>
            );
          if (link.location)
            return <li key={i}>{link.label}</li>;
          return null;
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-8 pb-4 w-full">
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="flex flex-col gap-4 min-w-[220px]">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                width={56}
                height={56}
                className="rounded-full object-cover bg-background border border-border"
                alt="BiteBase logo"
                priority
              />
              <span className="text-2xl font-bold text-primary tracking-tight">
                BiteBase
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
              Discover &amp; order delicious meals from trusted providers near you. Fresh food. Fast delivery. Simple experience.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="https://facebook.com/sujonbiswasdev"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors p-2"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://instagram.com/sujonbiswasdev"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors p-2"
              >
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com/in/sujonbiswasdev"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors p-2"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/sujonbiswasdev"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors p-2"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://wa.me/01804935939"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors p-1"
              >
                <Image
                  src="/whatsapp.png"
                  width={26}
                  height={26}
                  className="object-contain"
                  alt="WhatsApp"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          {/* Footer Columns */}
          {footerLinks.slice(0, 3).map((col) => (
            <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}
          {/* Support Column on desktop, after others */}
          <div className="mt-8 md:mt-0">
            <FooterColumn heading={footerLinks[3].heading} links={footerLinks[3].links} />
          </div>
        </motion.div>
        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-xs">
          <span className="w-full md:w-auto text-center md:text-left">
            © {new Date().getFullYear()} BiteBase. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/help"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
