"use client";

import { useParams } from "next/navigation";
import React from "react";

function Question() {
  const { slug } = useParams();
  console.log(slug);

  return <div className="flex-1">Question</div>;
}

export default Question;
