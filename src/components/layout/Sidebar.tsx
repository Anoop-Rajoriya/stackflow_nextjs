"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  LogOut,
  Settings,
  LucideIcon,
  Home,
  CircleQuestionMark,
  Tags,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Header";

type Props = {
  className?: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

function SidebarContentItems({ className, href, label, icon: Icon }: Props) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex justify-start", className)}
      >
        <Icon className="mr-2 h-5 w-5 shrink-0" />
        {label}
      </Button>
    </Link>
  );
}

export function SidebarContent({ className }: React.ComponentProps<"aside">) {
  const navLinks = [
    {
      href: "/home",
      label: "Home",
      icon: Home,
    },
    {
      href: "/questions",
      label: "Questions",
      icon: CircleQuestionMark,
    },
    {
      href: "/tags",
      label: "Tags",
      icon: Tags,
    },
    {
      href: "/users",
      label: "Users",
      icon: Users,
    },
  ];
  return (
    <aside className={cn("bg-sidebar rounded-xl w-full", className)}>
      <nav className="flex flex-col space-y-2 p-4">
        {navLinks.map(({ href, label, icon }) => (
          <SidebarContentItems
            key={label}
            className="w-full"
            href={href}
            label={label}
            icon={icon}
          />
        ))}
      </nav>
    </aside>
  );
}

function Sidebar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 bg-sidebar text-sidebar-foreground "
        >
          <SheetHeader className="border-b border-sidebar-border">
            <SheetTitle>
              <Logo small />
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <SidebarContent />

          <SheetFooter className="flex flex-col gap-2">
            {/* <Button variant="outline" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Sidebar;
