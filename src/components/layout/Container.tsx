"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Container;
