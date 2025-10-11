"use client";

import React from "react";
import { Logo } from "../shared/Logo";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

function Footer() {
  const Year = new Date().getFullYear();

  return (
    <footer className={cn(" mt-8 bg-background space-y-4")}>
      <Separator />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-2">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground max-w-xs">
            A modern Q&A platform built with Next.js and ShadCN UI. Inspired by
            Stack Overflow.
          </p>
        </div>

        {/* Links */}
        <section>
          <h2 className="text-sm font-semibold mb-2">Community</h2>
          <div className="flex flex-row md:flex-col gap-2">
            <FooterLink
              href="https://github.com/"
              target="_blank"
              icon={<Github className="h-4 w-4" />}
            >
              GitHub
            </FooterLink>
            <FooterLink
              href="https://twitter.com/"
              target="_blank"
              icon={<Twitter className="h-4 w-4" />}
            >
              Twitter
            </FooterLink>
            <FooterLink
              href="https://linkedin.com/"
              target="_blank"
              icon={<Linkedin className="h-4 w-4" />}
            >
              LinkedIn
            </FooterLink>
          </div>
        </section>
      </div>

      {/* Copyright */}
      <Separator />
      <div className="pt-4 text-center text-sm text-muted-foreground">
        &copy; {Year} | Created by{" "}
        <span className="font-medium">Anoop Rajoriya</span>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  icon,
  target,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}

export default Footer;
