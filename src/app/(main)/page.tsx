"use client";

import AskButton from "@/components/common/AskButton";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/lib/stores/authStore";
import axios from "axios";
import { Clock, Pen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

type Question = {
  $id: string;
  title: string;
  body: string;
  tags: string[];
  $createdAt: string;
};

function Home() {
  const { profile } = useAuthStore();
  const [userQuestions, setUserQuestions] = useState<Question[] | null>(null);

  // useEffect(() => {
  //   if (profile?.userId) {
  //     axios
  //       .get(`/api/${profile?.userId}/questions`)
  //       .then((res) => {
  //         const question = res.data.questions.map((q: Question) => ({
  //           ...q,
  //           $createdAt: new Date(q.$createdAt).toDateString(),
  //         }));
  //         setUserQuestions(question);
  //       })
  //       .catch(() => setUserQuestions(null));
  //   }
  // });

  return (
    <ProtectedRoute>
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
                Earn points by asking & answering questions.
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
                  {String(userQuestions?.length || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Answers</span>
                <span className="font-medium">0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Questions */}
        <div>
          <h2 className="text-xl font-bold mb-4">My Questions</h2>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {userQuestions &&
              userQuestions.map((que) => (
                <Card>
                  <CardContent>
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-lg font-semibold cursor-pointer flex-1 text-card-foreground hover:underline">
                        {que.title}
                      </h1>
                        <Button
                          size="icon"
                          title="Delete"
                          variant="destructive"
                          className="cursor-pointer"
                        >
                          <Trash />
                        </Button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {que.body.slice(0, 50)}...
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      {que.tags && (
                        <div className="flex flex-wrap gap-2">
                          {que.tags.map((tag) => (
                            <Badge variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      )}
                      <p className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {que.$createdAt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}

export default Home;
