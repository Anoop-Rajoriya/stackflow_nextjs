"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

function SettingsCard({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Use dark theme across the application
            </p>
          </div>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={(checked) => setDarkMode(checked)}
          />
        </div>
        <Separator />
        {children}
      </CardContent>
    </Card>
  );
}

export default SettingsCard;
