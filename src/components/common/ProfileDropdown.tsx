"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/lib/stores/authStore";

export function ProfileDropdown() {
  const { profile } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {profile?.fullName.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium hidden sm:block">
            {profile?.fullName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="dark:hover:bg-primary/50 text-primary-foreground"
          onClick={() => console.log("Profile clicked")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:hover:bg-primary/50 text-primary-foreground"
          onClick={() => console.log("Settings clicked")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Logout clicked")}
          className="dark:hover:bg-primary/50 text-primary-foreground"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
