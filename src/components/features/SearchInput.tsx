"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function SearchInput({ className }: Props) {
  function onSearch() {}
  return (
    <form className={cn("relative w-full flex", className)} onSubmit={onSearch}>
      <Input
        type="text"
        placeholder="Search questions..."
        className="pl-10 pr-4"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  );
}

export default SearchInput;
