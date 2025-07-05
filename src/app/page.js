
import Research from "@/components/Research";
import AboutUs from "@/components/AboutUs";
import Events from "@/components/events";
import Campus from "@/components/Campus";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import TestimonialSection from "@/components/TestimonialSection";
import Collaboration from "@/components/Colaboration";
import ColabLogo from "@/components/ColabLogo";
import Banner from "@/components/Banner";

export default function HomePage() {
  return (
    <main className=" font-outfit">

      <Hero/>
      <ColabLogo />
      <Banner />
      <Research />
      <AboutUs />
      <Campus />
      <Events/>
      <TestimonialSection />
      <Collaboration />
      <Footer />
    </main>
  );
}
