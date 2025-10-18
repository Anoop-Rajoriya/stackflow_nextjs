"use client";

import QuestionCard from "@/components/feature/QuestionCard";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";

type Question = {
  id: string;
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
  createdAt: string;
};

function Questions() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [state, setState] = useState<{
    error: string | null;
    loading: boolean;
  }>({
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      setState({ error: null, loading: true });
      try {
        const res = await api.get("/questions");
        const data = res.data;

        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          setQuestions(null);
        }

        setState({ error: null, loading: false });
      } catch (err) {
        setState({
          error:
            err instanceof Error
              ? err.message
              : "Something went wrong, please refresh the page.",
          loading: false,
        });
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="space-y-4 flex flex-col items-start flex-1 px-2 md:px-0">
      {state.loading ? (
        <div className="flex-1 flex items-center justify-center w-full py-10">
          <Spinner className="size-8" />
        </div>
      ) : state.error ? (
        <p className="text-red-500 text-center w-full py-4">{state.error}</p>
      ) : questions?.length ? (
        questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            title={q.title}
            body={q.body}
            tags={q.tags}
            votes={q.votes}
            answers={q.answers}
            views={q.views}
            comments={q.comments}
            author={q.author}
            createdAt={q.createdAt}
          />
        ))
      ) : (
        <p className="text-muted-foreground text-center w-full p-4">
          No Questions Found
        </p>
      )}
    </div>
  );
}

export default Questions;
