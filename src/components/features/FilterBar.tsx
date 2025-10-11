"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag, Filter, ChevronDown } from "lucide-react";
import { QuestionPreviewType } from "@/lib/type";

type FilterBarProps = {
  tags: string[];
  questions: QuestionPreviewType[];
  onFilter: (questions: QuestionPreviewType[]) => void;
};

function FilterBar({ tags, questions, onFilter }: FilterBarProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"Newest" | "Votes" | "Unanswered">("Newest");

  // 🔹 Filter by tag
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);

    let filtered = [...questions];

    if (tag) {
      filtered = filtered.filter((q) => q.tags.includes(tag));
    }

    // Apply current sort after filtering
    filtered = sortQuestions(filtered, sort);
    onFilter(filtered);
  };

  // 🔹 Sort logic
  const sortQuestions = (
    list: QuestionPreviewType[],
    sortType: "Newest" | "Votes" | "Unanswered"
  ) => {
    switch (sortType) {
      case "Votes":
        return list.sort((a, b) => b.stats.votes - a.stats.votes);
      case "Unanswered":
        return list.filter((q) => q.stats.answers === 0);
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  };

  // 🔹 Handle sort dropdown change
  const handleSortChange = (value: "Newest" | "Votes" | "Unanswered") => {
    setSort(value);

    let list = [...questions];

    // if a tag is selected, filter first
    if (selectedTag) {
      list = list.filter((q) => q.tags.includes(selectedTag));
    }

    list = sortQuestions(list, value);
    onFilter(list);
  };

  return (
    <div className="flex gap-2 justify-between">
      {/* Tag Filter */}
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            {selectedTag ? selectedTag : "All Tags"}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Select Tag</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleTagSelect(null)}>
            All Tags
          </DropdownMenuItem>
          {tags.map((tag) => (
            <DropdownMenuItem key={tag} onClick={() => handleTagSelect(tag)}>
              {tag}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {sort}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSortChange("Newest")}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("Votes")}>
            Votes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("Unanswered")}>
            Unanswered
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default FilterBar;
