"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
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
  SheetClose,
} from "@/components/ui/sheet";
import { Spinner } from "../ui/spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";

import useStore from "@/store";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const pathname = usePathname();
  const { isAuthenticated, _hasHydrated } = useStore();
  const [sheetState, setSheetState] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/questions", label: "Questions" },
    { href: "/questions/ask", label: "Ask Question" },
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
        <div className="hidden md:flex w-full max-w-48 items-center justify-center gap-2">
          {_hasHydrated &&
            authLinks.map(
              (link) =>
                isAuthenticated === link.auth && (
                  <AuthLink key={link.href} href={link.href} icon={link.icon}>
                    {link.label}
                  </AuthLink>
                )
            )}
          {_hasHydrated && isAuthenticated && <Logout />}
        </div>

        {/* ======= Mobile Nav & Auth ======= */}
        <div className="flex md:hidden items-center gap-2">
          {/* Login / Profile Icon */}
          {_hasHydrated &&
            (isAuthenticated ? (
              <AuthLink href="/profile" icon={CircleUserIcon}>
                Profile
              </AuthLink>
            ) : (
              <AuthLink href="/login" icon={LogInIcon}>
                Login
              </AuthLink>
            ))}
          {/* Mobile Menu Sheet */}
          <Sheet open={sheetState} onOpenChange={setSheetState}>
            <SheetTrigger asChild>
              <Button
                onClick={() => setSheetState(true)}
                variant="ghost"
                size="icon"
              >
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
                    onClick={() => setSheetState(false)}
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
                {_hasHydrated &&
                  authLinks.map(
                    (link) =>
                      isAuthenticated === link.auth && (
                        <AuthLink
                          key={link.href}
                          href={link.href}
                          icon={link.icon}
                          onClick={() => setSheetState(false)}
                        >
                          {link.label}
                        </AuthLink>
                      )
                  )}
                {_hasHydrated && isAuthenticated && (
                  <Logout onClick={() => setSheetState(false)} />
                )}
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
  onClick?: () => void;
};

function NavLink({ href, className, children, onClick }: NavLinkProps) {
  return (
    <Link onClick={onClick} href={href} className={cn("", className)}>
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
  onClick,
}: NavLinkProps & { icon: LucideIcon }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push(href);
        onClick?.();
      }}
      className={cn("gap-1", className)}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
}

/* ======= Logout Button ======= */
function Logout({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const { logout } = useStore();
  const [loading, setLoading] = useState(false);
  const onLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.push("/");
    } catch (error) {
      toast.error("Logging out failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      onClick?.();
    }
  };

  return (
    <>
      <Button
        onClick={onLogout}
        variant={"destructive"}
        className={cn("gap-1", className)}
        disabled={loading}
      >
        {loading ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <LogOutIcon className="h-4 w-4" />
        )}
        Logout
      </Button>
    </>
  );
}
