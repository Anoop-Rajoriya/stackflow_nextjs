"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        {/* Mini Logo */}
        <div className="flex justify-center md:justify-start">
          <Logo size="sm" />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 md:justify-end">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer bottom line */}
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} StackFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
