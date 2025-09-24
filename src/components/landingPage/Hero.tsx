"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import useAuthStore from "@/lib/stores/authStore";

function Hero() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            {!isAuthenticated ? (
              <>
                A community for developers to{" "}
                <span className="text-primary">ask and answer</span> technical
                questions
              </>
            ) : (
              <>
                Welcome back to <span className="text-primary">StackFlow</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            {!isAuthenticated ? (
              <>
                Join thousands of developers learning and solving problems
                together. Get help, share knowledge, and build your reputation.
              </>
            ) : (
              <>
                Continue your journey of asking, answering, and learning with
                thousands of developers worldwide.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/questions">
                Explore Questions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {!isAuthenticated ? (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <Link href="/register">Register Free</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link href="/questions/ask">Ask a Question</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
