"use client";

type Props = {
  name: string;        // country or region name
  type: "country" | "region";
};

export default function LocalCTA({ name, type }: Props) {

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="relative rounded-2xl overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <img
            src="/local-cta-bg.png" 
            alt="CTA"
            className="w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <div className="max-w-md text-white">

              {/* HEADING */}
              <h2 className="text-xl md:text-2xl font-semibold mb-3 leading-snug">
                Ready to stay connected in{" "}
                <span className="text-primary-500">
                  {name}
                </span>
                ?
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm mb-5 leading-relaxed">
                Buy your {name} eSIM online now from $4.99 and enjoy prepaid,
                unlimited data plans throughout your{" "}
                {type === "region" ? "trip" : `${name} trip`}.
              </p>

              {/* BUTTON */}
              <button
                onClick={handleScrollTop}
                className="bg-primary-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
              >
                {type === "country"
                  ? `Get Your ${name} eSIM`
                  : `Get Your eSIM`}
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}