import GlobalDetails from "@/components/Details/GlobalDetails";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/common/faq";
import InstallEsim from "@/components/home/InstallEsim";
import WhyChoose from "@/components/home/WhyChoose";


export default function Page() {
  
  return(  
  
  <>
       <GlobalDetails />
   
        <InstallEsim />
  
        <WhyChoose />
  
        <CTA />
  
        <FAQ />

      </>

  );
}