import Container from "@/components/layout/Container";
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
    </Container>
  );
}

export default MainLayout;
