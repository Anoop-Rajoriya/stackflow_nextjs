import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function AskButton() {
  return (
    <Button size="lg">
      <Link href="/question/ask">Ask Question</Link>
    </Button>
  );
}

export default AskButton;
