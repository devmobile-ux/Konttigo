
import InstallEsim from "@/components/home/InstallEsim";
import WhyChoose from "@/components/home/WhyChoose";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/common/faq";
import GlobalCta from "@/components/common/GlobalCta";
import CountryDetails from "@/components/Details/CountryDetails";
import LocalCTA from "@/components/common/LocalCta";
import Testimonials from "@/components/home/Testimonials";
import ExtraSections from "@/components/Details/ExtraSection";
import CoverageSection from "@/components/Details/CoverageSection";

export default function CountryPage({ params }: { params: { slug: string } }) {
  const countryName = params.slug.replace(/-/g, " ");

  return (
    <>
     <CountryDetails country={countryName} />

     <GlobalCta />

      <ExtraSections name={countryName}/>

      <CTA />

      <Testimonials />

      <FAQ type="country" slug={params.slug} />

      <CoverageSection type="country" name={countryName} />

      <LocalCTA name={countryName} type="country" />


    </>
  );
}