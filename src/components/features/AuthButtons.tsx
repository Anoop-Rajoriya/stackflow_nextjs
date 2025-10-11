"use client";

import React from "react";
import Link from "next/link";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

function AuthButtons({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button asChild variant="outline" size="sm">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/signup">Signup</Link>
      </Button>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {};

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}

export { AuthButtons, LogoutButton };
