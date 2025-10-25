"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import useStore from "@/store";
import api from "@/lib/axios";

type Question = {
  $id: string;
  title: string;
  tags: string[];
  authorName: string;
  votes: number;
  answers?: number;
  comments?: number;
  views?: number;
};
type Answer = {
  $id: string;
  body: string;
  authorName: string;
  votes: number;
  questionId: string;
};
type User = {
  $id: string;
  name: string;
  avatar?: string | null;
  reputation: number;
};

type HomeAnalytics = {
  topQuestions: Question[];
  topAnswers: Answer[];
  topUsers: User[];
  totalQuestion: number;
  totalAnswers: number;
  totalUsers: number;
};

export default function HomePage() {
  const { isAuthenticated, profile } = useStore();
  const [loading, setLoading] = useState(true);
  const [homeAnalytics, setHomeAnalytics] = useState<HomeAnalytics | null>(
    null
  );

  useEffect(() => {
    const fetchHomeAnalytics = async () => {
      setLoading(true);
      try {
        const res = await api.get("/home");
        setHomeAnalytics(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeAnalytics();
  }, []);

  if (loading || !homeAnalytics) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  const {
    topQuestions,
    topAnswers,
    topUsers,
    totalQuestion,
    totalAnswers,
    totalUsers,
  } = homeAnalytics;

  return (
    <main className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        {isAuthenticated && profile ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Welcome back,{" "}
              <span className="text-primary">
                {profile.name || "Developer"}
              </span>{" "}
              👋
            </motion.h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the latest questions or share your expertise with others.
            </p>

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/questions/ask">Ask a Question</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">My Profile</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Welcome to <span className="text-primary">StackFlow</span>
            </motion.h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community of developers to ask, answer, and learn
              together. 🚀
            </p>

            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">
            {totalQuestion}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Answers</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">
            {totalAnswers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">
            {totalUsers}
          </CardContent>
        </Card>
      </section>

      {/* Top Questions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Top Questions</h2>
          <Button variant="ghost" asChild>
            <Link href="/questions" className="flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topQuestions.map((q) => (
            <Card key={q.$id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  {q.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {q.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>by {q.authorName}</span>
                  <span>{q.votes} votes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Answers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Top Answers</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAnswers.map((a) => (
            <Card key={a.$id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{a.body}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between text-sm text-muted-foreground">
                <span>by {a.authorName}</span>
                <span>{a.votes} votes</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Users */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Top Users</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topUsers.map((user) => (
            <Card
              key={user.$id}
              className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`
                  }
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  Reputation: {user.reputation}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
