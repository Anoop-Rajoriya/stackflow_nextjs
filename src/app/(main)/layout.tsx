import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SidebarContent } from "@/components/layout/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      <div className="flex-1 flex px-4 py-2 space-x-4">
        <SidebarContent className="hidden md:block max-w-52" />
        {children}
      </div>
      <Footer />
    </Container>
  );
}

export default MainLayout;
