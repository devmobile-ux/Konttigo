import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "@/styles/globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <div className="bg-[#FFFADA]">
          <Navbar />
          {children}
          <Footer />
        </div>
        </body>
    </html>
  );
}