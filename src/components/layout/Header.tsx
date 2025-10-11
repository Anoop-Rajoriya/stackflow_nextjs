import React from "react";
import { Logo } from "../shared/Logo";
import { SideBar } from "./SideBar";
import SearchInput from "../features/SearchInput";
import { AuthButtons, LogoutButton } from "../features/AuthButtons";

function Header() {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex space-x-2">
          <SideBar />
          <Logo />
        </div>
        <div className="flex space-x-2">
          <SearchInput className="hidden md:flex max-w-md" />
          <AuthButtons />
          {/* <LogoutButton /> */}
        </div>
      </header>
      <SearchInput className="md:hidden" />
    </div>
  );
}

export default Header;
