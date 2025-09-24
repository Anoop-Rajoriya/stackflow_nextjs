import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function CTA() {
  const test = false;
  if (test) {
    return (
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What would you like to do today?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ask, answer, and grow your knowledge. The community is waiting for
              you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/questions/ask">
                  Ask a Question
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <Link href="/profile">View My Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the community?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sign up now and start asking questions, sharing knowledge, and
            building your reputation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
              asChild
            >
              <Link href="/questions">Browse Questions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
