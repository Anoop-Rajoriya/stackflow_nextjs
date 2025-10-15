import Container from "@/components/layout/Container";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <Container className="items-center justify-center">{children}</Container>
  );
}

export default MainLayout;
