import CTA from "@/components/home/CTA";
import Destination from "@/components/home/Destination";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import InstallEsim from "@/components/home/InstallEsim";
import Testimonials from "@/components/home/Testimonials";
import WhyChoose from "@/components/home/WhyChoose";

export default function Home() {
  return (
    <>
      <Hero />
      <Destination />
      <InstallEsim />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  );
}