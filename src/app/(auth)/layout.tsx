import React from "react";
import Container from "@/components/layout/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="items-center justify-center">{children}</Container>
  );
}
