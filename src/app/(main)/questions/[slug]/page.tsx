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
import useStore from "@/store";
import { Button } from "@/components/ui/button";

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
  views: string[];
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

type QueDetailState = {
  question: Question;
  answerList: Answer[];
};

export default function QuestionDetailPage() {
  const { slug } = useParams();
  const { profile } = useStore();
  const [queDetail, setQueDetail] = useState<QueDetailState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/question/${slug}`);
      setQueDetail({
        question: res.data.question,
        answerList: res.data.answers,
      });
    } catch (error) {
      console.log("[questions/slug] error: ", error);
      setError(
        error instanceof Error ? error.message : "Failed to load question"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-start justify-center">
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!queDetail) {
    return <div className="flex-1">Data not found</div>;
  }

  return (
    <div className="flex-1 space-y-6 max-w-4xl w-full mx-auto px-2 md:px-4">
      {/* Question Block */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">
            {queDetail.question.title}
          </h1>
          <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
            <p>Asked: {formatDate(queDetail.question.$createdAt)}</p>
            <p>Updated: {formatDate(queDetail.question.$updatedAt)}</p>
            <p>Views: {queDetail.question.views.length}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="sm:w-16 flex sm:flex-col items-center gap-2">
            <Vote targetId={queDetail.question.$id} targetType="question" />
          </div>

          <div className="flex-1 space-y-4">
            <MDEditor.Markdown
              source={queDetail.question.body}
              className="[&_code]:bg-muted-foreground/10 prose p-2 px-4 rounded-md"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex flex-wrap gap-2">
                {queDetail.question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <span>
                  Posted by{" "}
                  <span className="font-medium text-foreground">
                    {queDetail.question.author.name}
                  </span>{" "}
                  • {queDetail.question.author.reputation} rep
                </span>
              </div>
            </div>
          </div>
        </div>
        <CommentBlock
          targetId={queDetail.question.$id}
          targetType="question"
          isCollapsible={false}
        />
      </section>
      <Separator />
      {/* Answer Block */}
      <section className="space-y-4">
        {queDetail.answerList.length ? (
          <>
            <h2 className="text-2xl font-semibold">
              {queDetail.answerList.length}{" "}
              {queDetail.answerList.length > 1 ? "Answers" : "Answer"}
            </h2>
            {queDetail.answerList.map((ans) => (
              <div key={ans.$id} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 rounded-lg border p-4 bg-card shadow-sm">
                  <div className="sm:w-16 flex sm:flex-col items-center gap-2">
                    <Vote targetId={ans.$id} targetType="answer" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <MDEditor.Markdown
                      source={ans.body}
                      className="[&_code]:bg-muted-foreground/10 prose p-2 px-4 "
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
                <CommentBlock
                  targetId={ans.$id}
                  targetType="answer"
                  isCollapsible={true}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="text-muted-foreground italic">
            No answers yet. Be the first to answer!
          </p>
        )}
      </section>
      {profile && profile.id !== queDetail.question.author.$id && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Post Your Answer</h2>
          <AnswerForm
            targetId={queDetail.question.$id}
            reFetch={fetchQuestion}
          />
        </section>
      )}
    </div>
  );
}
