import React from "react";
import AskButton from "@/components/common/AskButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import QuestionCard from "@/components/questions/QuestionCard";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data
const questions = [
  {
    id: 1,
    title: "How to center a div in CSS?",
    body: "I have been trying to center a div element horizontally and vertically on the page. I tried using margin: auto but it only centers horizontally...",
    author: "Sarah Chen",
    authorRep: 2543,
    votes: 42,
    answers: 8,
    views: 1234,
    tags: ["css", "html", "flexbox"],
    hasAcceptedAnswer: true,
    timestamp: "2 hours ago",
    bounty: null,
  },
  {
    id: 2,
    title: "React useState not updating immediately",
    body: "When I call setState, the state variable does not update immediately in the next line. How can I use the updated value right away?",
    author: "Mike Johnson",
    authorRep: 8921,
    votes: 156,
    answers: 12,
    views: 5678,
    tags: ["javascript", "reactjs", "hooks"],
    hasAcceptedAnswer: true,
    timestamp: "5 hours ago",
    bounty: 50,
  },
  {
    id: 3,
    title: "PostgreSQL query performance optimization",
    body: "My query is taking over 30 seconds to execute on a table with 10M rows. I have indexes on the columns I am filtering by...",
    author: "Alex Kumar",
    authorRep: 15234,
    votes: 89,
    answers: 15,
    views: 3456,
    tags: ["postgresql", "sql", "performance", "database"],
    hasAcceptedAnswer: false,
    timestamp: "1 day ago",
    bounty: null,
  },
  {
    id: 4,
    title: "Docker container cannot connect to host database",
    body: "I am running a Node.js application in Docker and trying to connect to MySQL on my host machine using localhost:3306...",
    author: "Emma Wilson",
    authorRep: 4521,
    votes: 23,
    answers: 4,
    views: 892,
    tags: ["docker", "mysql", "networking"],
    hasAcceptedAnswer: false,
    timestamp: "3 hours ago",
    bounty: null,
  },
  {
    id: 5,
    title: "Next.js getServerSideProps vs getStaticProps",
    body: "What is the difference between getServerSideProps and getStaticProps? When should I use one over the other?",
    author: "David Park",
    authorRep: 6789,
    votes: 67,
    answers: 6,
    views: 2341,
    tags: ["nextjs", "reactjs", "ssr"],
    hasAcceptedAnswer: true,
    timestamp: "6 hours ago",
    bounty: null,
  },
  {
    id: 6,
    title: "Python list comprehension with multiple conditions",
    body: "How can I filter a list using multiple conditions in a list comprehension? I want to keep items that satisfy condition A OR condition B...",
    author: "Lisa Anderson",
    authorRep: 3214,
    votes: 34,
    answers: 9,
    views: 1567,
    tags: ["python", "list-comprehension"],
    hasAcceptedAnswer: true,
    timestamp: "12 hours ago",
    bounty: null,
  },
];

function Questions() {
  return (
    <section className="space-y-4 flex-1">
      {/* Page Header */}
      <div className="flex items-center justify-between space-x-4 mb-4">
        <span className="text-2xl font-bold">All Questions</span>
        <AskButton />
      </div>
      {/* Page Filter */}
      <div className="flex items-center justify-between space-x-2">
        <span className="font-semibold text-muted-foreground capitalize">
          {questions.length} questions
        </span>
        <div>
          <ToggleGroup variant="outline" type="single" defaultValue="newest">
            <ToggleGroupItem
              value="newest"
              aria-label="Toggle newest"
              className="px-4 py-2"
            >
              Newest
            </ToggleGroupItem>
            <ToggleGroupItem
              value="active"
              aria-label="Toggle active"
              className="px-4 py-2"
            >
              Active
            </ToggleGroupItem>
            <ToggleGroupItem
              value="unanswered"
              aria-label="Toggle unanswered"
              className="px-4 py-2"
            >
              Unanswered
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {/* Page Card Container */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {questions.length > 0 &&
          questions.map((que, indx) => <QuestionCard key={indx} data={que} />)}
      </div>
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

export default Questions;
