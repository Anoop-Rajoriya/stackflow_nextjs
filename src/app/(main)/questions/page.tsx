"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircleIcon } from "lucide-react";
import QuestionCard from "@/components/feature/QuestionCard";

type Question = {
  $id: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  comments: number;
  author: {
    name: string;
    reputation: number;
  };
  $createdAt: string;
};

function Questions() {
  const [questionList, setQuestionsList] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchQuestions = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.get("/question");
      const queList = res.data.questions;
      if (Array.isArray(queList) && queList.length > 0) {
        setQuestionsList(queList);
      } else {
        setQuestionsList([]);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong, please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
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
      <div className="flex-1">
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (questionList.length) {
    return questionList.map((que) => (
      <QuestionCard
        key={que.$id}
        id={que.$id}
        title={que.title}
        body={que.body}
        tags={que.tags}
        votes={que.votes}
        answers={que.answers}
        views={que.views}
        comments={que.comments}
        author={que.author}
        createdAt={que.$createdAt}
      />
    ));
  }

  return (
    <p className=" flex-1 text-muted-foreground text-center p-4">
      No Questions Found
    </p>
  );
}

export default Questions;
