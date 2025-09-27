"use client";
import useAuthStore from "@/lib/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated) {
      if (!isAuthenticated && pathname === "/") {
        router.push("/questions");
      } else if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, hydrated, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
