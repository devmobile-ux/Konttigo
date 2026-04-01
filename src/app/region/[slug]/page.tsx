import RegionalDetails from "@/components/Details/RegionDetails";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import InstallEsim from "@/components/home/InstallEsim";
import WhyChoose from "@/components/home/WhyChoose";

export default function Page({ params }: { params: { slug: string } }) {
  const region = params.slug.replace(/-/g, " ");

  return(  
  
  <>
       <RegionalDetails region={region} />
   
        <InstallEsim />
  
        <WhyChoose />
  
        <CTA />
  
        <FAQ />

      </>

  );
}