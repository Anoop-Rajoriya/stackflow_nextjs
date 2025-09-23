import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function Sidebar({ className }: React.ComponentProps<"div">) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn("lg:hidden", className)}
          variant="secondary"
          size="icon"
        >
          <Menu className="size-12" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="invisible">TaskFlow Sidebar</SheetTitle>
        <SidebarContent className="block" />
      </SheetContent>
    </Sheet>
  );
}

export function SidebarContent({ className }: React.ComponentProps<"aside">) {
  return <aside className={cn("hidden lg:block", className)}>Aside</aside>;
}

export default Sidebar;
