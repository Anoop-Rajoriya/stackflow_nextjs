"use client";

import AskButton from "@/components/common/AskButton";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/lib/stores/authStore";
import Link from "next/link";
import React from "react";

function Home() {
  const { profile, loading } = useAuthStore();

  return (
    <ProtectedRoute>
      {loading && !profile ? (
        <div>Loading...</div>
      ) : (
        <section className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome to StackFlow,{" "}
                <span className="text-primary">{profile?.fullName}</span>{" "}
              </h1>
              <p className="text-muted-foreground mt-1">
                Find answers to your technical questions and help others solve
                theirs.
              </p>
            </div>
            <AskButton />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Reputation</CardTitle>
                <CardDescription>
                  Earn points by{" "}
                  <Link href="#" className="text-primary hover:underline">
                    asking
                  </Link>{" "}
                  &{" "}
                  <Link href="#" className="text-primary hover:underline">
                    answering
                  </Link>{" "}
                  questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <span className="text-2xl font-semibold">
                  {String(profile?.reputation)}
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
                <CardDescription>Track your contributions</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Questions</span>
                  <span className="font-medium">
                    {String(profile?.reputation)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Answers</span>
                  <span className="font-medium">0</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </ProtectedRoute>
  );
}

export default Home;
