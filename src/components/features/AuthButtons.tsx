"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

export default AuthButtons;
