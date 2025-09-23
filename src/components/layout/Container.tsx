import { cn } from "@/lib/utils";
import React from "react";

function Container({ children, className }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "container mx-auto p-2 flex flex-col min-h-screen",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Container;
