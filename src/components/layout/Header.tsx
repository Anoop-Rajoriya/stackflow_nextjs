"use client";

import { cn } from "@/lib/utils";
import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useAuthStore from "@/lib/stores/authStore";
import AskQuestionBtn from "../common/AskQuestionBtn";

type LogoProps = {
  className?: string;
  size?: "sm" | "lg";
  showText?: boolean;
};

function Logo({ className, size = "lg", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="StackFlow"
      className={cn("flex items-center space-x-2", className)}
    >
      <div
        className={cn(
          "bg-primary flex items-center justify-center",
          size === "lg" ? "w-8 h-8 rounded-lg" : "w-6 h-6 rounded"
        )}
      >
        <Code
          className={cn(
            "text-primary-foreground",
            size === "lg" ? "w-5 h-5" : "w-4 h-4"
          )}
        />
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold text-foreground",
            size === "lg" ? "text-xl" : "text-base"
          )}
        >
          StackFlow
        </span>
      )}
    </Link>
  );
}

function LandingHeader({ className }: React.ComponentProps<"header">) {
  const { isAuthenticated, profile } = useAuthStore();
  // const { isAuthenticated, profile } = {
  //   isAuthenticated: true,
  //   profile: { fullName: "Anoop Rajoriya" },
  // };
  return (
    <header
      className={cn(
        "border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50",
        className
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <AskQuestionBtn />
              <Link
                href={`/users/${encodeURIComponent(profile?.fullName!)}`}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {profile?.fullName.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {profile?.fullName}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MainHeader({ className }: React.ComponentProps<"header">) {}

export { MainHeader, LandingHeader, Logo };
