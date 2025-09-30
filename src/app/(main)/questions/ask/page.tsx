import BackButton from "@/components/common/BackButton";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import QuestionForm from "@/components/forms/QuestionForm";
import React from "react";

function Ask() {
  return (
    <ProtectedRoute>
      <section className="space-y-4 flex-1 pb-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground flex justify-between items-center">
            Ask a Question
            <BackButton />
          </h2>
          <p className="mt-2 text-muted-foreground">
            Be specific and imagine you're asking a question to another person
          </p>
        </div>
        <QuestionForm />
      </section>
    </ProtectedRoute>
  );
}

export default Ask;
