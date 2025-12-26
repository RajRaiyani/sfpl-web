"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-full-black.svg"
                alt="SFPL"
                width={200}
                height={200}
                className="w-36 sm:w-36 md:w-44 h-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Specific Fire Protection Limited - Your trusted partner{" "}
              <br className="hidden sm:block" />
              for fire safety solutions.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link
                href="https://www.linkedin.com/in/specific-fire/"
                target="_blank"
                aria-label="LinkedIn"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/specificfire"
                target="_blank"
                aria-label="Instagram"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/specific.fire"
                target="_blank"
                aria-label="Facebook"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@SPECIFIC_FIRE"
                target="_blank"
                aria-label="YouTube"
                className="p-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-600 rounded-lg transition-all duration-200"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900">
              Quick links
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/services")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Services
              </Link>
              <Link
                href="/tech"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/tech")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Tech
              </Link>
              <Link
                href="/about"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/about")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/jobs"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/jobs")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={`block text-xs sm:text-sm transition-colors ${
                  isActive("/contact")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Contact Us
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                  <a
                    href="tel:+919512570090"
                    className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors break-words"
                  >
                    +91 9512570090
                  </a>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                  <a
                    href="mailto:contact@specificfire.com"
                    className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors break-all"
                  >
                    contact@specificfire.com
                  </a>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/2RYxPfe4o69tCfy69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors break-words"
                  >
                    105, IIT Gandhinagar Research park, Gandhinagar, Gujarat
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Both Offices */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 sm:pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2023 Specific Fire Protection Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
