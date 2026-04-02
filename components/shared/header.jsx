"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Cookies } from "react-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, Menu, User } from "lucide-react";

const CUSTOMER_PORTAL_LOGOUT_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_LOGOUT_URL ??
  "https://server.specificfire.com/customer-portal/auth/logout";

function AccountDropdownContent({
  userName,
  rawUser,
  profileHref,
  dashboardHref,
  isLoggingOut,
  onLogout,
}) {
  return (
    <>
      <DropdownMenuLabel className="font-normal">
        <p className="truncate text-sm font-medium text-foreground">{userName}</p>
        {typeof rawUser === "object" && rawUser?.email ? (
          <p className="truncate text-xs text-muted-foreground">{rawUser.email}</p>
        ) : null}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <a href={profileHref}>
          <User />
          Profile
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href={dashboardHref}>
          <LayoutDashboard />
          Dashboard
        </a>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        variant="destructive"
        disabled={isLoggingOut}
        onSelect={(e) => {
          e.preventDefault();
          void onLogout();
        }}
      >
        <LogOut />
        {isLoggingOut ? "Signing out…" : "Log out"}
      </DropdownMenuItem>
    </>
  );
}

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
  const profileHref = connectBaseUrl ? buildConnectUrl("/profile") : "/connect";
  const loginHref = connectBaseUrl ? buildConnectUrl("/login") : "/login";
  const registerHref = connectBaseUrl
    ? buildConnectUrl("/register")
    : "/register";

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const clearSessionCookies = useCallback(() => {
    cookiesApi.remove("token", { path: "/" });
    cookiesApi.remove("user", { path: "/" });
    setCookieState({ token: undefined, rawUser: undefined });
  }, [cookiesApi]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      await fetch(CUSTOMER_PORTAL_LOGOUT_URL, {
        method: "POST",
        headers,
        credentials: "include",
      });
    } catch {
      // Still clear local session if the server is unreachable.
    } finally {
      clearSessionCookies();
      setIsLoggingOut(false);
      window.location.assign("/");
    }
  }, [clearSessionCookies, isLoggingOut, token]);

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
      <div className="container relative mx-auto flex h-20 items-center justify-between px-4">
        {/* Mobile: menu (left) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              className="relative z-10 p-2 rounded-md text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
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
              {!token ? (
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
              ) : null}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo — centered on mobile, normal position on desktop */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:static md:left-auto md:top-auto md:z-auto md:translate-x-0 md:translate-y-0"
        >
          <Image
            src="/logo-full-black.svg"
            alt="SFPL Logo"
            width={170}
            height={42}
            priority
            className="w-28 sm:w-32 md:w-[170px]"
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
          <div className="flex items-center gap-3 sm:gap-4">
            {!token ? (
              <>
                <Link href="/contact">
                  <Button variant="default">Contact</Button>
                </Link>
                <a href={loginHref}>
                  <Button variant="outline">Login / Register</Button>
                </a>
              </>
            ) : (
              <div className="flex items-center gap-3 sm:gap-4 pl-1">
                <a
                  href={dashboardHref}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 rounded-md px-1 py-0.5"
                >
                  Dashboard
                </a>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="group flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-white px-2.5 py-1.5 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                      aria-label={`Account menu for ${userName}`}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground"
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
                      <span className="max-w-[140px] truncate text-sm font-medium text-gray-900 sm:max-w-[160px]">
                        {userName}
                      </span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <AccountDropdownContent
                      userName={userName}
                      rawUser={rawUser}
                      profileHref={profileHref}
                      dashboardHref={dashboardHref}
                      isLoggingOut={isLoggingOut}
                      onLogout={handleLogout}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
        {/* Mobile: profile / login (right) — min width matches menu button for balance */}
        <div className="relative z-10 flex h-10 min-w-10 shrink-0 items-center justify-end md:hidden">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200/90 bg-white shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                  aria-label={`Account menu for ${userName}`}
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary-foreground flex h-full w-full items-center justify-center bg-primary">
                      {avatarFallbackLetter}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <AccountDropdownContent
                  userName={userName}
                  rawUser={rawUser}
                  profileHref={profileHref}
                  dashboardHref={dashboardHref}
                  isLoggingOut={isLoggingOut}
                  onLogout={handleLogout}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a
              href={loginHref}
              className="whitespace-nowrap pl-1 text-sm font-medium text-primary hover:underline"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
