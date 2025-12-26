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

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.includes(path);
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/tech", label: "Tech" },
    { href: "/about", label: "About Us" },
    { href: "/jobs", label: "Careers" },
  ];

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-full-black.svg"
            alt="SFPL Logo"
            width={170}
            height={42}
            priority
            className="w-32 sm:w-40 md:w-[170px]"
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 lg:gap-4 xl:gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? " text-primary font-semibold"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Desktop Actions */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button>Contact us</Button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] sm:w-[400px] p-0 flex flex-col"
          >
            {/* Sheet Header with Logo */}
            <div className="px-6 pt-8 pb-6 border-b border-gray-100">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo-full-black.svg"
                  alt="SFPL Logo"
                  width={170}
                  height={42}
                  priority
                  className="w-40"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-6 flex flex-col gap-1">
              {navigationItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200 flex items-center ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary active:bg-gray-100"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </SheetClose>
              ))}
              {/* Contact Button */}
              <SheetClose asChild>
                <Link href="/contact" className="mt-2">
                  <Button className="w-full" size="lg">
                    Contact us
                  </Button>
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
