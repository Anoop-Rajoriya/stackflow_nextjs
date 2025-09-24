"use client";

import useAuthStore from "@/lib/stores/authStore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../common/Loading";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  protectedRoutes?: string[];
};

function AuthProvider({ children, protectedRoutes }: Props) {
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (protectedRoutes?.some((path) => pathName.startsWith(path))) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthProvider;
