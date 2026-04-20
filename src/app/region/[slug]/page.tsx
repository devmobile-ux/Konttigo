import RegionalDetails from "@/components/Details/RegionDetails";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/common/faq";
import InstallEsim from "@/components/home/InstallEsim";
import WhyChoose from "@/components/home/WhyChoose";
import ExtraSections from "@/components/Details/ExtraSection";
import GlobalCTA from "@/components/common/GlobalCta";
import Testimonials from "@/components/home/Testimonials";
import LocalCTA from "@/components/common/LocalCta";
import CoverageSection from "@/components/Details/CoverageSection";

export default function Page({ params }: { params: { slug: string } }) {
  const region = params.slug.replace(/-/g, " ");

  return(  
  
  <>
       <RegionalDetails region={region} />

       <GlobalCTA />
   
        <ExtraSections name={region}/>
  
        <CTA />

        <Testimonials />
  
        <FAQ type="region" slug={params.slug} />

        <CoverageSection type="region" name={region} />

        <LocalCTA name={region} type="region" />

      </>

  );
}