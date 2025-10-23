"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import AskQuestionForm from "@/components/feature/AskQuestionForm";
import { UserOnlyRoute } from "@/components/shared/RouteProvider";
import { AskQuestionValues } from "@/lib/FormsSchema";
import useStore from "@/store";
import { toast } from "react-toastify";

function AskQuestion() {
  const { getValidJWT } = useStore();
  const slug = useSearchParams().get("slug");

  const onCreate = async (value: AskQuestionValues) => {
    const token = await getValidJWT();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await api.post("/question", value, {
      headers,
    });
  };
  const onEdit = async (value: AskQuestionValues) => {};

  return (
    <div className="flex-1 overflow-auto py-2">
      {slug ? (
        <AskQuestionForm mode="edit" onSubmit={onEdit} />
      ) : (
        <AskQuestionForm mode="create" onSubmit={onCreate} />
      )}
    </div>
  );
}

export default UserOnlyRoute(AskQuestion);
