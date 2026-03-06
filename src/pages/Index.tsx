import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
// import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      {/* <Articles /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
