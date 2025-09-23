"use client";

import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";
import useAuthStore from "@/lib/stores/authStore";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";

function Header() {
  const { isAuthenticated, loading } = useAuthStore();
  return (
    <header className="flex items-center justify-between border-b-2 border-border pb-2">
      <Sidebar />
      <Link
        href="/"
        id="logo"
        className="text-lg font-bold text-accent-foreground capitalize flex items-center justify-center"
      >
        <Code className="size-8 mr-2" />
        StackFlow
      </Link>

      {!isAuthenticated && !loading && (
        <nav className="space-x-2">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
