import React from "react";
import Container from "@/components/layout/Container";

function AuthLayout({ children }: React.ComponentProps<"main">) {
  return (
    <Container className="flex  items-center justify-center p-6 md:p-10">
      {children}
    </Container>
  );
}

export default AuthLayout;
