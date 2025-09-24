import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

function AskQuestionBtn() {
  return (
    <Button size="sm" asChild>
      <Link href="/ask">
        <Plus className="w-4 h-4 mr-2" />
        Ask Question
      </Link>
    </Button>
  );
}

export default AskQuestionBtn;
