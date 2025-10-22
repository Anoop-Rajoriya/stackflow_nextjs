"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon } from "lucide-react";
import AnswerForm from "@/components/feature/AnswerForm";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Vote from "@/components/feature/Vote";
import api from "@/lib/axios";
import CommentBlock from "@/components/feature/Comment";

type Author = {
  $id: string;
  name: string;
  avatar: string | null;
  reputation: number;
};

type Answer = {
  $id: string;
  body: string;
  author: Author;
  votes: number;
  $createdAt: string;
  $updatedAt: string;
};

type Question = {
  $id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  views: number;
  author: Author;
  $createdAt: string;
  $updatedAt: string;
};

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function QuestionDetailPage() {
  const { slug } = useParams();

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [answerError, setAnswerError] = useState<string | null>(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setQuestionError(null);
    try {
      const qRes = await api.get(`/questions/${slug}`);
      setQuestion(qRes.data.question);
    } catch (err) {
      console.error("Question fetch error:", err);
      setQuestionError(
        err instanceof Error ? err.message : "Failed to load question"
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchAnswers = async () => {
    setLoading(true);
    setAnswerError(null);
    try {
      const aRes = await api.get(`/questions/${slug}/answers`);
      setAnswers(aRes.data.answers);
    } catch (err) {
      console.error("Question fetch error:", err);
      setQuestionError(
        err instanceof Error ? err.message : "Failed to load question"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [slug]);

  // Loading
  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center py-16">
        <Spinner className="size-10" />
      </div>
    );
  }

  // Error
  if (questionError) {
    return (
      <div className=" flex-1 px-4 py-10">
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{questionError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Not Found
  if (!question) {
    return (
      <div className="flex-1 text-center text-muted-foreground py-16">
        Question not found.
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 px-4 py-6">
      {/* QUESTION BLOCK */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">{question.title}</h1>
          <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
            <p>Asked: {formatDate(question.$createdAt)}</p>
            <p>Updated: {formatDate(question.$updatedAt)}</p>
            <p>Views: {question.views}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-16 flex sm:flex-col items-center gap-2">
            <Vote targetId={question.$id} votes={question.votes} />
          </div>

          <div className="flex-1 space-y-4">
            <div className="rounded-md border p-4 bg-card">
              <MDEditor.Markdown
                source={question.body}
                className="[&_code]:bg-muted-foreground/10 prose"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <span>
                  Posted by{" "}
                  <span className="font-medium text-foreground">
                    {question.author.name}
                  </span>{" "}
                  • {question.author.reputation} rep
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* ANSWER SECTION */}
      {answerError ? (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{answerError}</AlertDescription>
        </Alert>
      ) : answers.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            {answers.length} {answers.length > 1 ? "Answers" : "Answer"}
          </h2>

          {answers.map((ans) => (
            <div
              key={ans.$id}
              className="flex flex-col sm:flex-row gap-6 rounded-lg border p-4 bg-card shadow-sm"
            >
              <div className="sm:w-16 flex sm:flex-col items-center gap-2">
                <Vote targetId={ans.$id} votes={ans.votes} />
              </div>

              <div className="flex-1 space-y-3">
                <MDEditor.Markdown
                  source={ans.body}
                  className="[&_code]:bg-muted-foreground/10 prose"
                />
                <div className="text-sm text-muted-foreground">
                  <span>
                    Answered by{" "}
                    <span className="font-medium text-foreground">
                      {ans.author.name}
                    </span>{" "}
                    • {ans.author.reputation} rep
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground italic">
          No answers yet. Be the first to answer!
        </p>
      )}

      {/* ANSWER FORM */}
      <div className="pt-6 border-t">
        <h3 className="text-xl font-semibold mb-3">Your Answer</h3>
        <AnswerForm targetId={question.$id} reFetch={fetchAnswers} />
      </div>
    </div>
  );
}
