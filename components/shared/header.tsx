"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.includes(path);
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/connect", label: "SFPL CONNECT" },
    { href: "/services", label: "Services" },
    { href: "/tech", label: "Tech" },
    { href: "/about", label: "About Us" },
    { href: "/jobs", label: "Careers" },
  ];

  const mobileNavItems = [
    ...navigationItems,
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 sm:h-20">
        {/* Mobile: menu (left) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              className="relative z-10 rounded-md p-2 text-gray-700 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            id="mobile-nav"
            className="flex w-[min(320px,85vw)] flex-col p-0 sm:w-[400px]"
          >
            <div className="border-b border-gray-100 px-6 pt-8 pb-6">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo-full-black.svg"
                  alt="Specific Fire Protection Limited"
                  width={170}
                  height={42}
                  priority
                  className="w-40"
                />
              </Link>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-6 py-6">
              {mobileNavItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary active:bg-gray-100"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo — centered on mobile, normal position on desktop */}
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:static md:left-auto md:top-auto md:z-auto md:translate-x-0 md:translate-y-0"
        >
          <Image
            src="/logo-full-black.svg"
            alt="Specific Fire Protection Limited"
            width={170}
            height={42}
            priority
            className="w-28 sm:w-32 md:w-[170px]"
          />
        </Link>
        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden gap-1 md:flex lg:gap-2 xl:gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-2 text-sm font-medium transition-colors lg:px-3 ${
                isActive(item.href)
                  ? "font-semibold text-primary"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Desktop Actions — ecommerce (login/cart) hidden for now */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="default">Contact</Button>
          </Link>
        </div>
        {/* Mobile: spacer to balance the left menu button */}
        <div className="relative z-10 h-10 w-10 shrink-0 md:hidden" aria-hidden />
      </div>
    </header>
  );
}
