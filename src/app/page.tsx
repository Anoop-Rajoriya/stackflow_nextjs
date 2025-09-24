import CTA from "@/components/landingPage/CTA";
import Features from "@/components/landingPage/Features";
import Hero from "@/components/landingPage/Hero";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { LandingHeader } from "@/components/layout/Header";

export default function Landing() {
  return (
    <Container className="bg-background grid-pattern">
      <LandingHeader />
      <Hero />
      <Features />
      <Footer />
    </Container>
  );
}
