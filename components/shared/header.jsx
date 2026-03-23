"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Cookies } from "react-cookie";
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
  const cookiesApi = useMemo(() => new Cookies(), []);
  const [cookieState, setCookieState] = useState({
    token: undefined,
    rawUser: undefined,
  });

  useEffect(() => {
    const getUserFingerprint = (user) => {
      if (user === undefined || user === null) return String(user);
      if (typeof user === "string") return `str:${user}`;
      try {
        return `obj:${JSON.stringify(user)}`;
      } catch {
        return `obj:${String(user)}`;
      }
    };

    const syncFromCookies = () => {
      const nextToken = cookiesApi.get("token");
      const nextRawUser = cookiesApi.get("user");

      setCookieState((prev) => {
        const prevUserFp = getUserFingerprint(prev.rawUser);
        const nextUserFp = getUserFingerprint(nextRawUser);

        if (prev.token === nextToken && prevUserFp === nextUserFp) {
          return prev;
        }

        return { token: nextToken, rawUser: nextRawUser };
      });
    };

    syncFromCookies();
    const intervalId = window.setInterval(syncFromCookies, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncFromCookies();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", syncFromCookies);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", syncFromCookies);
    };
  }, [cookiesApi]);

  const token = cookieState.token;
  const rawUser = cookieState.rawUser;

  const connectBaseUrl = process.env.NEXT_PUBLIC_CONNECT_SITE_URL;
  const buildConnectUrl = (path = "") => {
    if (!connectBaseUrl) return "";

    // Helps if someone configured `http://host/:5174` instead of `http://host:5174`
    const base = String(connectBaseUrl)
      .replace(/\/:(\d+)/, ":$1")
      .replace(/\/$/, "");

    const cleanedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

    return `${base}${cleanedPath}`;
  };

  const dashboardHref = connectBaseUrl ? buildConnectUrl("") : "/connect";
  const loginHref = connectBaseUrl ? buildConnectUrl("/login") : "/login";
  const registerHref = connectBaseUrl
    ? buildConnectUrl("/register")
    : "/register";

  const userName =
    typeof rawUser === "string"
      ? rawUser
      : rawUser?.name ||
        rawUser?.full_name ||
        rawUser?.user_name ||
        rawUser?.email?.split("@")?.[0] ||
        "User";

  const avatarSrc =
    typeof rawUser === "string"
      ? undefined
      : rawUser?.avatar_url ||
        rawUser?.avatar ||
        rawUser?.profile_picture ||
        rawUser?.profileImage ||
        rawUser?.image ||
        rawUser?.picture ||
        rawUser?.photo_url ||
        undefined;

  const avatarFallbackLetter = useMemo(() => {
    const s = String(userName || "").trim();
    return s ? s[0].toUpperCase() : "U";
  }, [userName]);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.includes(path);
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/connect", label: "SFPL Connect" },
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
          <div className="flex items-center gap-2">
            <Link href="/contact">
              <Button variant="default">Contact</Button>
            </Link>
            {token ? (
              <div className="flex items-center gap-5">
                <a
                  href={dashboardHref}
                  aria-label="Dashboard"
                  className="hover:text-primary"
                >
                  <div size="sm">Dashboard</div>
                </a>
                <div className="flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5 ring-1 ring-primary/20">
                  <div
                    className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm overflow-hidden"
                    aria-hidden="true"
                  >
                    {avatarSrc ? (
                      // Using <img> to avoid Next Image domain config requirements.
                      <img
                        src={avatarSrc}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span>{avatarFallbackLetter}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">
                    {userName}
                  </span>
                </div>
              </div>
            ) : (
              <a href={loginHref}>
                <Button variant="outline">Login / Register</Button>
              </a>
            )}
          </div>
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
              {token ? (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <div
                      className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm overflow-hidden"
                      aria-hidden="true"
                    >
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span>{avatarFallbackLetter}</span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {userName}
                    </div>
                  </div>
                  <SheetClose asChild>
                    <a href={dashboardHref}>
                      <Button className="w-full" size="lg">
                        Dashboard
                      </Button>
                    </a>
                  </SheetClose>
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <SheetClose asChild>
                    <a href={loginHref} className="w-1/2">
                      <Button className="w-full" variant="outline" size="lg">
                        Login
                      </Button>
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a href={registerHref} className="w-1/2">
                      <Button className="w-full" size="lg">
                        Register
                      </Button>
                    </a>
                  </SheetClose>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
