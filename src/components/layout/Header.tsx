"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  UserPlusIcon,
  LogInIcon,
  LogOutIcon,
  CircleUserIcon,
  LucideIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import { Separator } from "@/components/ui/separator";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const pathname = usePathname();

  // ⚠️ Replace this with actual auth state
  const isAuth = false;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/questions", label: "Questions" },
  ];

  const authLinks = [
    { href: "/signup", icon: UserPlusIcon, label: "Signup", auth: false },
    { href: "/login", icon: LogInIcon, label: "Login", auth: false },
    { href: "/profile", icon: CircleUserIcon, label: "Profile", auth: true },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 md:px-3",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between">
        <Logo />

        {/* ======= Desktop Nav ======= */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ======= Desktop Auth Buttons ======= */}
        <div className="hidden md:flex items-center gap-2">
          {authLinks.map(
            (link) =>
              isAuth === link.auth && (
                <AuthLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </AuthLink>
              )
          )}
          {isAuth && <Logout />}
        </div>

        {/* ======= Mobile Nav & Auth ======= */}
        <div className="flex md:hidden items-center gap-2">
          {/* Login / Profile Icon */}
          {isAuth ? (
            <AuthLink href="/profile" icon={CircleUserIcon}>
              Profile
            </AuthLink>
          ) : (
            <AuthLink href="/login" icon={LogInIcon}>
              Login
            </AuthLink>
          )}
          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-4">
              <SheetHeader className="border-b">
                <SheetTitle className="text-left">Menu</SheetTitle>
                <SheetDescription className="text-left">
                  Navigate through the site
                </SheetDescription>
              </SheetHeader>

              {/* Mobile NavLinks */}
              <div className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-foreground",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Auth Links */}
              <div className="flex justify-end gap-2 border-t py-3 px-4">
                {authLinks.map(
                  (link) =>
                    isAuth === link.auth && (
                      <AuthLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                      >
                        {link.label}
                      </AuthLink>
                    )
                )}
                {isAuth && <Logout />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ======= Reusable NavLink ======= */
type NavLinkProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, className, children }: NavLinkProps) {
  return (
    <Link href={href} className={cn("", className)}>
      {children}
    </Link>
  );
}

/* ======= Reusable AuthLink ======= */
function AuthLink({
  href,
  className,
  children,
  icon: Icon,
}: NavLinkProps & { icon: LucideIcon }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(href);
      }}
      className={cn("gap-1", className)}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
}

function Logout({ className }: { className?: string }) {
  const router = useRouter();
  const onLogout = async () => {};

  return (
    <Button
      onClick={onLogout}
      variant={"destructive"}
      className={cn("gap-1", className)}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  );
}
