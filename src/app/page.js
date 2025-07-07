import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";
import AboutUs from "@/components/HomePage/AboutUs";
import Banner from "@/components/HomePage/Banner";
import Campus from "@/components/HomePage/Campus";
import ColabLogo from "@/components/HomePage/ColabLogo";
import Collaboration from "@/components/HomePage/Colaboration";
import Events from "@/components/HomePage/Events";
import Hero from "@/components/HomePage/Hero";
import ResearchSection from "@/components/HomePage/Research";
import TestimonialSection from "@/components/HomePage/TestimonialSection";


export default function HomePage() {
  return (
    <main className=" font-outfit">
      <ChatbotWidget />
      <Hero/>
      <ColabLogo />
      <Banner />
      <ResearchSection />
      <AboutUs />
      <Campus />
      <Events/>
      <TestimonialSection />
      <Collaboration />
    </main>
  );
}
