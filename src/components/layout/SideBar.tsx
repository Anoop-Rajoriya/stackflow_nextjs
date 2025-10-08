"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  LucideIcon,
  CircleQuestionMarkIcon,
  HomeIcon,
  TagsIcon,
  UserIcon,
} from "lucide-react";

const navItems = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/questions", name: "Questions", icon: CircleQuestionMarkIcon },
  { path: "/tags", name: "Tags", icon: TagsIcon },
  { path: "/profile", name: "Profile", icon: UserIcon },
];

type Props = {
  className?: string;
};

function SideBar({ className }: Props) {
  return (
    <div className={cn("md:hidden", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="shrink-0">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[260px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-lg font-bold">StackFlow</SheetTitle>
            <SheetDescription className=""></SheetDescription>
          </SheetHeader>
          <SideBarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SideBarContent({ className }: Props) {
  return (
    <aside className={cn("flex-col h-full", className)}>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((nav, index) => (
          <NavItem key={index} href={nav.path} icon={nav.icon}>
            {nav.name}
          </NavItem>
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      )}
    >
      <Icon />
      <span>{children}</span>
    </Link>
  );
}

export { SideBar, SideBarContent };
