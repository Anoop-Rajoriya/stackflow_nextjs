"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import AnswerForm from "@/components/feature/AnswerForm";
import CommentBlock from "@/components/feature/Comment";
import { nanoid } from "nanoid";

// 🧠 Mock data (replace with server data fetching)
const mockQuestion = {
  id: "q101",
  title: "How to debounce input in React efficiently?",
  body: `I want to debounce user input in a search bar to prevent too many API calls. I've tried \`setTimeout\` and \`useEffect\`, but it's not working as expected.`,
  author: { id: "a1", name: "Anoop Rajoriya", reputation: 1540, avatar: null },
  createdAt: "2025-10-18T10:30:00Z",
  updatedAt: "2025-10-19T09:00:00Z",
  votes: 12,
  views: 50,
  tags: ["react", "javascript", "debounce", "hooks"],
  comments: [
    {
      id: "c1",
      author: "Jane",
      body: "Have you tried lodash.debounce?",
      createdAt: "2025-10-18T12:00:00Z",
    },
    {
      id: "c2",
      author: "John",
      body: "Show your code sample!",
      createdAt: "2025-10-18T12:30:00Z",
    },
  ],
  answers: [
    {
      id: "a1",
      body: `You can use \`useCallback\` with lodash.debounce to handle this cleanly.`,
      author: { id: "a2", name: "Jane Doe", reputation: 980, avatar: null },
      createdAt: "2025-10-18T11:00:00Z",
      updatedAt: "2025-10-18T11:30:00Z",
      votes: 5,
      comments: [
        {
          id: "ac1",
          author: "User1",
          body: "This worked for me too!",
          createdAt: "2025-10-18T12:45:00Z",
        },
      ],
    },
  ],
};

type Author = {
  id: string;
  name: string;
  avatar: string | null;
  reputation: number;
};

type Comment = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

type Answer = {
  id: string;
  body: string;
  author: Author;
  votes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

type Question = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  views: number;
  author: Author;
  comments: Comment[];
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
};

export default function QuestionDetailPage() {
  const { slug } = useParams();
  const [question, setQuestion] = useState<Question | null>(mockQuestion);
  const [states, setStates] = useState<{
    error: string | null;
    loading: boolean;
  }>({
    error: null,
    loading: false,
  });

  useEffect(() => {}, []);

  return (
    <div className="container max-w-5xl mx-auto p-4 space-y-10">
      {/*  Question Section */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{mockQuestion.title}</h1>
          <div className="text-sm text-muted-foreground flex gap-2">
            <p>Asked: {new Date(mockQuestion.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(mockQuestion.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Votes */}
          <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
            <Button size="icon" variant="ghost">
              <ArrowBigUp className="h-6 w-6" />
            </Button>
            <span className="font-semibold">{mockQuestion.votes}</span>
            <Button size="icon" variant="ghost">
              <ArrowBigDown className="h-6 w-6" />
            </Button>
          </div>

          {/* Body & Meta */}
          <div className="flex-1 space-y-4">
            <div className="prose max-w-none">
              <MDEditor.Markdown source={mockQuestion.body} />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex gap-2 flex-1">
                {mockQuestion.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <span>
                  Answered by{" "}
                  <span className="font-medium">
                    {mockQuestion.author.name}
                  </span>{" "}
                  • {mockQuestion.author.reputation} rep
                </span>
              </div>
            </div>
          </div>
        </div>

        <CommentBlock
          comments={mockQuestion.comments}
          targetId={mockQuestion.id}
          isCollapsible={false}
        />
      </section>
      <Separator />
      {/*  Answers Section */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold">
          {mockQuestion.answers.length}{" "}
          {mockQuestion.answers.length === 1 ? "Answer" : "Answers"}
        </h2>

        {mockQuestion.answers.map((ans) => (
          <div key={nanoid()} className="space-y-3 border-b pb-4">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Votes */}
              <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
                <Button size="icon" variant="ghost">
                  <ArrowBigUp className="h-5 w-5" />
                </Button>
                <span className="font-semibold">{ans.votes}</span>
                <Button size="icon" variant="ghost">
                  <ArrowBigDown className="h-5 w-5" />
                </Button>
              </div>

              {/* Body */}
              <div className="flex-1 space-y-3">
                <div className="prose max-w-none">
                  <MDEditor.Markdown source={ans.body} />
                </div>

                <div className="text-sm text-muted-foreground">
                  <span>
                    Answered by{" "}
                    <span className="font-medium">{ans.author.name}</span> •{" "}
                    {ans.author.reputation} rep
                  </span>
                </div>
                <CommentBlock
                  comments={ans.comments}
                  targetId={ans.id}
                  isCollapsible={true}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      {/*  Answer Form */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Your Answer</h3>
        <AnswerForm />
      </section>
    </div>
  );
}
