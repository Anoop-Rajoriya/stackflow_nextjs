"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} size="icon" variant="outline">
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
}

export default BackButton;
