import Image from "next/image";

const testimonials = [
  {
    name: "Sophie Laurent",
    text: "I used this eSIM on my Europe trip and it worked flawlessly. No SIM swapping, no stress — just smooth connectivity everywhere.",
    image: "/user1.png",
  },
  {
    name: "Michael Brown",
    text: "Setup was super simple and I stayed connected the entire trip. No more worrying about roaming bills!",
    image: "/user2.png",
  },
  {
    name: "Rohit Singh",
    text: "As a digital nomad, reliable internet is everything. This made it effortless across multiple countries.",
    image: "/user3.png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold">
            Trusted by thousands of{" "}
            <span className="text-primary-500">
              travelers worldwide
            </span>
          </h2>

          <p className="text-md mt-2 text-textSecondary">
            Seamless connectivity across countries, without the hassle of roaming charges.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border hover:shadow-md transition"
              style={{ borderColor: "#FFBA94" }}
            >

              {/* USER IMAGE */}
              <div className="mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </div>

              {/* TEXT */}
              <p className="text-sm text-textSecondary mb-6 leading-relaxed">
                {item.text}
              </p>

              {/* NAME */}
              <p className="font-semibold text-sm text-textPrimary">
                — {item.name}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}