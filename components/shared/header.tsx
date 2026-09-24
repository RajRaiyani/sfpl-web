"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  User,
} from "lucide-react";
import StoreCartButton from "@/components/store/StoreCartButton";
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
} from "@/lib/auth-storage";
import env from "@/config/env";

const CUSTOMER_PORTAL_LOGOUT_URL = `${env.serverProxyUrl}/customer-portal/auth/logout`;

type AuthUser = NonNullable<ReturnType<typeof getAuthUser>>;

interface AccountDropdownContentProps {
  userName: string;
  user: AuthUser | null;
  dashboardHref: string;
  isLoggingOut: boolean;
  onLogout: () => void | Promise<void>;
}

function AccountDropdownContent({
  userName,
  user,
  dashboardHref,
  isLoggingOut,
  onLogout,
}: AccountDropdownContentProps) {
  return (
    <>
      <DropdownMenuLabel className="font-normal">
        <p className="truncate text-sm font-medium text-foreground">
          {userName}
        </p>
        {user?.email ? (
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        ) : null}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/account">
          <User />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/orders">
          <Package />
          My orders
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href={dashboardHref}>
          <LayoutDashboard />
          Connect dashboard
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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const syncAuthFromCookies = useCallback(() => {
    setToken(getAuthToken());
    setUser(getAuthUser());
  }, []);

  useEffect(() => {
    syncAuthFromCookies();
  }, [pathname, syncAuthFromCookies]);

  useEffect(() => {
    setRedirectUrl(window.location.href);
  }, [pathname]);

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
  const connectSiteUrl = connectBaseUrl
    ? String(connectBaseUrl)
        .replace(/\/:(\d+)/, ":$1")
        .replace(/\/$/, "")
    : "";

  const loginHref =
    connectSiteUrl && redirectUrl
      ? `${connectSiteUrl}/login?redirect_url=${encodeURIComponent(redirectUrl)}`
      : "/login";

  const registerHref =
    connectSiteUrl && redirectUrl
      ? `${connectSiteUrl}/register?redirect_url=${encodeURIComponent(redirectUrl)}`
      : "/register";

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
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
      clearAuthSession();
      setToken(null);
      setUser(null);
      setIsLoggingOut(false);
      window.location.assign("/");
    }
  }, [isLoggingOut, token]);

  const userName =
    user?.name ||
    user?.full_name ||
    user?.user_name ||
    user?.email?.split("@")?.[0] ||
    "User";

  const avatarSrc =
    user?.avatar_url ||
    user?.avatar ||
    user?.profile_picture ||
    user?.profileImage ||
    user?.image ||
    user?.picture ||
    user?.photo_url ||
    undefined;

  const avatarFallbackLetter = useMemo(() => {
    const s = String(userName || "").trim();
    return s ? s[0].toUpperCase() : "U";
  }, [userName]);

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
        {/* Desktop Actions */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3 sm:gap-4">
            <StoreCartButton />
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
                      user={user}
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
        {/* Mobile: cart + profile / login (right) */}
        <div className="relative z-10 flex h-10 min-w-10 shrink-0 items-center justify-end gap-1.5 md:hidden">
          <StoreCartButton />
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
                  user={user}
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
