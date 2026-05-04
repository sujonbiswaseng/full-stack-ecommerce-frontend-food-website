"use client";

import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileCard from "./ProfileCard";
import { CartModal } from "../Cardmodel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TUser } from "@/types/user.type";
import React from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  user: TUser | null;
}
export interface User<T> {
  user: {
    data: T;
  };
}

const NAV_CONTAINER =
  "sticky top-0 z-50 w-full bg-background/80 border-b border-border backdrop-blur-md";
const NAV_WRAP =
  "mx-auto max-w-[1440px] w-full px-4 md:px-6 flex flex-col";
const NAV_DESKTOP =
  "hidden lg:flex w-full items-center justify-between min-h-[64px] py-4 gap-4";
const NAV_MOBILE =
  "flex lg:hidden w-full flex-row items-center justify-between py-4";
const LOGO_CONTAINER = "flex items-center gap-3 min-w-[40px]";
const LOGO_IMG =
  "w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 object-cover rounded-full bg-card border border-border";
const LOGO_TEXT =
  "hidden sm:inline text-lg md:text-xl font-bold tracking-tight max-w-[150px] truncate text-foreground";
const LOGO_TEXT_MOBILE =
  "hidden sm:inline text-base font-bold tracking-tight text-foreground";
const NAV_LINK_LIST =
  "flex flex-row gap-4 items-center text-base md:text-lg font-medium";
const NAV_ACTIONS =
  "flex items-center gap-2 sm:gap-4 min-w-fit";
const BUTTON_BASE =
  "h-10 px-5 rounded-full transition-colors";
const MOBILE_SHEET_HEADER =
  "flex items-center gap-3 py-6";
const SHEET_CONTENT =
  "overflow-y-auto bg-background min-w-[80vw] sm:min-w-[350px] max-w-full";
const SHEET_ACCORDION =
  "flex w-full flex-col gap-2";
const SHEET_AUTH =
  "flex flex-col gap-4 py-4";
const MOBILE_MENU_ACTIONS =
  "flex flex-col gap-4 pt-4";
const NAV_MOTION_PROPS = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22, ease: "easeOut" },
};

const Navbar: React.FC<Navbar1Props> = ({
  logo = {
    url: "/",
    src: "https://res.cloudinary.com/drmeagmkl/image/upload/v1772007286/logo_rcsr8h.png",
    alt: "logo",
    title: "AppBrand",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
    { title: "Categories", url: "/category" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Blog", url: "/blog" },
    { title: "Help", url: "/help" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
  user,
}) => {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  const userinfo = user as TUser | null;

  return (
    <header className={cn(NAV_CONTAINER, className)}>
      <div className={NAV_WRAP}>

        {/* Desktop Navigation */}
        <nav className={NAV_DESKTOP} aria-label="Primary Navigation">
          {/* Logo */}
          <Link href={logo.url} className={LOGO_CONTAINER} tabIndex={0} aria-label="Brand logo">
            <img
              src={logo.src}
              alt={logo.alt}
              className={LOGO_IMG}
            />
            <span className={LOGO_TEXT}>{logo.title}</span>
          </Link>
          {/* Menu */}
          <NavigationMenu>
            <NavigationMenuList className={NAV_LINK_LIST}>
              {menu.map((item) => (
                <DesktopMenuItem
                  key={item.title}
                  item={item}
                  isActive={isActive}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Actions */}
          <div className={NAV_ACTIONS}>
            <CartModal />
            {userinfo ? (
              <ProfileCard profile={userinfo} />
            ) : (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className={BUTTON_BASE}
                  size="sm"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className={BUTTON_BASE}
                  size="sm"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className={NAV_MOBILE} aria-label="Mobile Navigation">
          {/* Logo */}
          <Link
            href={logo.url}
            className={LOGO_CONTAINER}
            tabIndex={0}
            aria-label="Brand logo"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={cn("w-8 h-8 object-cover rounded-full border border-border bg-card")}
            />
            <span className={LOGO_TEXT_MOBILE}>{logo.title}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-1"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent className={SHEET_CONTENT} side="left">
                <SheetHeader>
                  <SheetTitle asChild>
                    <Link href={logo.url} className={MOBILE_SHEET_HEADER}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-8 h-8 object-cover rounded-full border border-border bg-card"
                      />
                      <span className={LOGO_TEXT}>{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <Accordion type="single" collapsible className={SHEET_ACCORDION}>
                    {menu.map((item) => (
                      <MobileMenuItem key={item.title} item={item} isActive={isActive} />
                    ))}
                  </Accordion>
                  <div className={MOBILE_MENU_ACTIONS}>
                    {userinfo ? (
                      <ProfileCard profile={userinfo} />
                    ) : (
                      <div className={SHEET_AUTH}>
                        <Button
                          asChild
                          variant="outline"
                          className={BUTTON_BASE}
                          size="sm"
                        >
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                          asChild
                          className={BUTTON_BASE}
                          size="sm"
                        >
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            {/* Cart Modal on mobile */}
            <div className="ml-1">
              <CartModal />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

type RenderMenuItemProps = {
  item: MenuItem;
  isActive: (url: string) => boolean;
};

// Desktop menu item
const DesktopMenuItem: React.FC<RenderMenuItemProps> = ({ item, isActive }) => {
  if (item.items?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={cn(
            "px-4 py-2 rounded-full font-medium bg-background text-foreground hover:bg-accent/50 transition-colors duration-200",
            "focus-visible:ring-2 focus-visible:ring-primary outline-none"
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover rounded-2xl shadow-lg w-[90vw] max-w-md md:max-w-xl p-4 border border-border text-popover-foreground">
          <div className="grid grid-cols-1 gap-2">
            {item.items.map((subItem) => (
              <NavigationMenuLink
                asChild
                key={subItem.title}
                className="w-full"
              >
                <SubMenuLink
                  item={subItem}
                  isActive={isActive}
                />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className={cn(
            "group inline-flex h-10 min-w-[90px] justify-center items-center px-4 rounded-full border text-sm font-semibold transition-all duration-200",
            isActive(item.url)
              ? "bg-primary text-primary-foreground border-primary shadow focus-visible:ring-2 ring-primary"
              : "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground"
          )}
          aria-current={isActive(item.url) ? "page" : undefined}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// SubMenuLink: dropdown & mobile sub link
const SubMenuLink: React.FC<{ item: MenuItem; isActive: (url: string) => boolean }> = ({ item, isActive }) => {
  return (
    <Link
      href={item.url}
      className={cn(
        "flex flex-row items-center gap-4 rounded-md px-4 py-3 w-full transition-colors duration-200 outline-none select-none",
        isActive(item.url)
          ? "bg-accent/60 text-accent-foreground font-semibold"
          : "hover:bg-accent hover:text-accent-foreground text-foreground"
      )}
      tabIndex={0}
      aria-current={isActive(item.url) ? "page" : undefined}
    >
      {item.icon && <span className="text-foreground">{item.icon}</span>}
      <span className="flex-1 flex flex-col">
        <span className="text-base font-semibold">
          {item.title}
        </span>
        {item.description && (
          <span className="text-sm text-muted-foreground leading-snug">
            {item.description}
          </span>
        )}
      </span>
    </Link>
  );
};

// Mobile menu item with Accordion for subitems
const MobileMenuItem: React.FC<RenderMenuItemProps> = ({ item, isActive }) => {
  if (item.items?.length) {
    return (
      <AccordionItem value={item.title} className="border-b-0">
        <AccordionTrigger
          className="text-base font-semibold text-foreground hover:no-underline px-2 py-3 rounded-lg"
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pl-2 pt-2">
          {item.items.map((subItem) => (
            <SubMenuLink
              key={subItem.title}
              item={subItem}
              isActive={isActive}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      href={item.url}
      className={cn(
        "block w-full px-2 py-3 text-base font-semibold rounded-lg transition-colors",
        isActive(item.url)
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
      )}
      tabIndex={0}
      aria-current={isActive(item.url) ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
};

export { Navbar };