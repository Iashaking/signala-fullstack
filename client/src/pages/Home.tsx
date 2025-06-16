import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProjectStructure from "@/components/ProjectStructure";
import InteractiveDemo from "@/components/InteractiveDemo";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <Features />
      <ProjectStructure />
      <InteractiveDemo />
      <Analytics />
      <Footer />
    </div>
  );
}
