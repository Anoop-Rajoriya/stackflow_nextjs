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
        "container mx-auto min-h-screen flex flex-col bg-background",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Container;
