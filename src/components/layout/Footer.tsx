"use client";

import React from "react";
import { Logo } from "../shared/Logo";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

function Footer() {
  const Year = new Date().getFullYear();

  return (
    <footer className={cn("border-t mt-10 bg-background")}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo + Description */}
          <div className="flex flex-col items-start gap-2">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern Q&A platform built with Next.js and ShadCN UI. Inspired
              by Stack Overflow.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold mb-1">StackFlow</h2>
              <FooterLink href="/questions">Questions</FooterLink>
              <FooterLink href="/tags">Tags</FooterLink>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold mb-1">Community</h2>
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
            </section>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {Year} | Created by{" "}
          <span className="font-medium">Anoop Rajoriya</span>
        </div>
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
