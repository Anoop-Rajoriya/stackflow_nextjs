import React from "react";
import Container from "@/components/layout/Container";

function MainLayout({ children }: React.ComponentProps<"main">) {
  return <Container>{children}</Container>;
}

export default MainLayout;
