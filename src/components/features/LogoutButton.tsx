"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 👉 TODO: Add your actual logout logic here
      // Example if using Appwrite:
      // await account.deleteSession("current");

      // Or clear cookies / localStorage:
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // localStorage.removeItem("auth_token");

      // Redirect to homepage or login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}

export default LogoutButton;
