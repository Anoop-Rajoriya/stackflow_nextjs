"use client";

import { useAuth } from "@/zustand/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  if (session) return null;
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <main className="w-full max-w-sm">{children}</main>
    </div>
  );
}

export default AuthLayout;
