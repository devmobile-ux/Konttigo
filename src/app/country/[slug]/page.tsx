
import InstallEsim from "@/components/home/InstallEsim";
import WhyChoose from "@/components/home/WhyChoose";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import CountryDetails from "@/components/Details/CountryDetails";

export default function CountryPage({ params }: { params: { slug: string } }) {
  const countryName = params.slug.replace(/-/g, " ");

  return (
    <>
     <CountryDetails country={countryName} />

      <InstallEsim />

      <WhyChoose />

      <CTA />

      <FAQ />

    </>
  );
}