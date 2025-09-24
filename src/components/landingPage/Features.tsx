import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MessageCircle, Tag, Trophy, Users } from "lucide-react";
import Link from "next/link";

function Features() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate through the most important areas of the community and
            contribute today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>
                <Link href="/questions/ask">Ask Questions</Link>
              </CardTitle>
              <CardDescription>
                Share your doubts and get help from the community.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>
                <Link href="/questions/unanswered">Answer Questions</Link>
              </CardTitle>
              <CardDescription>
                Help others by contributing solutions and insights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>
                <Link href="/profile">Reputation</Link>
              </CardTitle>
              <CardDescription>
                Track your progress and earn recognition for your contributions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>
                <Link href="/tags">Tags</Link>
              </CardTitle>
              <CardDescription>
                Discover and explore questions by categories and technologies.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;
