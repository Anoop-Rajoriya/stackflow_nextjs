import Link from "next/link";
import { Logo } from "./Header";

function Footer() {
  return (
    <footer className="border-t bg-muted/30 rounded-t-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        {/* Top section */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          <Logo small />
          <nav className="flex flex-wrap justify-center gap-4 md:ml-8 md:gap-6">
            <Link href="/questions" className="text-sm hover:underline">
              Questions
            </Link>
            <Link href="/questions/ask" className="text-sm hover:underline">
              Ask Answer
            </Link>
            <Link href="/tags" className="text-sm hover:underline">
              Tags
            </Link>
            <Link href="/users" className="text-sm hover:underline">
              Users
            </Link>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="text-center text-xs text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} | Created by{" "}
          <span className="font-medium">Anoop Rajoriya</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
