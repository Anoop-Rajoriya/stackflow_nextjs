import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

export default MainLayout;
