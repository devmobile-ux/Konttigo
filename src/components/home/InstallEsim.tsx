import Image from "next/image";

const steps = [
  {
    image: "/step1.png",
  },
  {
    image: "/step2.png",
  },
  {
    image: "/step3.png",
  },
  {
    image: "/step4.png",
  },
  {
    image: "/step5.png"
  },
  {
    image: "/step6.png"
  },
];

export default function InstallEsim() {
  return (
    <section className="bg-[#FFFFFF] py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">

        
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center leading-snug">
          How Konttigo eSIM Works in 5 Easy <br/> Steps -{" "}
          <span className="text-orange-500">
            No Sim Swap Required
          </span>
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-500 text-center mt-4 max-w-2xl mx-auto text-base md:text-md">
          Activate your eSIM for international travel instantly with our easy
          activation process. Learn the steps:
        </p>

        {/* STEPS */}
        <div className="grid grid-cols-1 mt-8 sm:grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-10">

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">

              {/* IMAGE */}
              <div>
                <Image
                  src={step.image}
                  alt={`Step ${i + 1}`}
                  width={320}
                  height={220}
                  className="object-contain"
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}