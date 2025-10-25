"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import MDEditor from "@uiw/react-md-editor";
import Markdown from "@uiw/react-markdown-preview";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios";
import useStore from "@/store";

type Profile = {
  name: string;
  reputation: number;
  email: string;
  about: string;
  avatar: string | null;
};

export default function ProfilePage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { getValidJWT } = useStore();
  const [loading, setLoading] = useState(false);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = await getValidJWT();
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const res = await api.get(`/profile`, { headers });
      setProfile(res.data.profile);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!loading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );

  return (
    <div
      className="container max-w-4xl mx-auto py-10 space-y-8 p-4"
      // data-color-mode={resolvedTheme}
    >
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center md:items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile?.avatar || ""} alt="User Avatar" />
            <AvatarFallback>
              {profile?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{profile?.name}</h2>
            <p className="text-muted-foreground">{profile?.email}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm mt-3">
              <Stat label="Reputation" value="1,240" />
              <Stat label="Questions" value="15" />
              <Stat label="Answers" value="27" />
              <Stat label="Comments" value="45" />
              <Stat label="Votes" value="190" />
            </div>

            {/* ✅ About preview added in overview */}
            {profile?.about && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-semibold mb-1">About</h3>
                <div className="prose max-w-none text-sm">
                  <Markdown
                    source={profile.about}
                    className=" p-2 py-4 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="edit">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Edit Profile */}
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Display Name */}
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" defaultValue="Anoop Rajoriya" />
                </div>

                {/* Avatar File */}
                <div>
                  <Label htmlFor="avatarFile">Avatar</Label>
                  <Input id="avatarFile" type="file" accept="image/*" />
                </div>

                {/* About Editor */}
                <div className="space-y-2">
                  <Label>About</Label>
                  <div className="border rounded-md p-2">
                    <MDEditor preview="edit" height={200} />
                  </div>
                </div>

                <Button type="submit" className="mt-2">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Select Theme</Label>
              <Select
                value={theme === "system" ? "system" : resolvedTheme}
                onValueChange={(val) => setTheme(val)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Deleting your account will permanently remove all your data
                including questions, answers, and comments.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted/30 rounded-md py-2 px-3 text-center">
    <p className="text-sm font-semibold">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);
