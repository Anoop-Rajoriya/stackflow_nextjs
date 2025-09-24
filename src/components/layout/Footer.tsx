import { Code, Github, MessageCircle, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "./Header";

function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand Section */}
          <div className="md:w-1/2">
            <Logo size="sm" className="mb-4" />
            <p className="text-sm text-muted-foreground">
              A community-driven platform for developers to learn, share, and
              grow together.
            </p>
          </div>
          {/* Links */}
          <div className="flex gap-8 justify-between">
            {/* Community Links */}
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/questions"
                    className="hover:text-foreground transition-colors"
                  >
                    Questions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags"
                    className="hover:text-foreground transition-colors"
                  >
                    Tags
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users"
                    className="hover:text-foreground transition-colors"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    href="/badges"
                    className="hover:text-foreground transition-colors"
                  >
                    Badges
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-3 ">Connect</h3>
              <div className="flex space-x-4 text-muted-foreground">
                <Link
                  href="https://twitter.com"
                  className="hover:text-foreground transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://github.com"
                  className="hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://discord.gg"
                  className="hover:text-foreground transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 StackFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
