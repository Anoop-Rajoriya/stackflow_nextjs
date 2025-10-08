import React from "react";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SideBarContent } from "@/components/layout/SideBar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Header />
      <div className="flex space-x-4 py-2 pt-6">
        <SideBarContent className="hidden md:flex" />
        {children}
      </div>
      <Footer />
    </Container>
  );
}

export default HomeLayout;
