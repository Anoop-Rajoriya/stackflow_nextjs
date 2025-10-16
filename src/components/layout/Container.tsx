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
        "container min-h-screen flex flex-col gap-2 mx-auto",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Container;
