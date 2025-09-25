"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import useAuthStore from "@/lib/stores/authStore";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

type LogoProps = {
  className?: string;
  small?: boolean;
};
type SearchBarProps = {
  className?: string;
};

export function Logo({ className, small = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded bg-accent",
          small ? "h-5 w-5" : "h-8 w-8"
        )}
      >
        <span
          className={cn(
            "font-bold text-accent-foreground",
            small ? "text-xs" : "text-sm"
          )}
        >
          SF
        </span>
      </div>
      <span
        className={cn(
          "font-bold hover:underline",
          small ? "text-base" : "text-xl"
        )}
      >
        StackFlow
      </span>
    </Link>
  );
}

export function ProfileDropDown() {
  const router = useRouter();
  const { logout } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/users/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LoginAndRegisterBtns() {
  return (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder="Search..." className="pl-8" />
    </div>
  );
}

function Header() {
  const { isAuthenticated, profile, loading, hydrated } = useAuthStore();
  console.log(isAuthenticated, hydrated);
  return (
    <header className="p-2 flex flex-col space-y-3 md:space-y-0 sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between">
        <div className="left flex space-x-2">
          <Sidebar />
          <Logo />
        </div>
        <div className="right flex space-x-2">
          <SearchBar className="hidden sm:block max-w-sm" />
          {hydrated ? (
            isAuthenticated && profile ? (
              <ProfileDropDown />
            ) : (
              <LoginAndRegisterBtns />
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <SearchBar className="sm:hidden" />
    </header>
  );
}

export default Header;
