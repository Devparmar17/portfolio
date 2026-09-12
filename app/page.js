import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GridOverlay from "@/components/ui/GridOverlay";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium shadow-lg">
        Skip to content
      </a>

      <Navbar />

      <div className="relative z-10">
        <GridOverlay />

        <main id="main" className="flex-1 pb-24">
          <Hero />
          <SectionDivider patternId="divider-about" />
          <About />
          <SectionDivider patternId="divider-skills" />
          <Skills />
          <SectionDivider patternId="divider-experience" />
          <Experience />
          <SectionDivider patternId="divider-projects" />
          <Projects />
          <SectionDivider patternId="divider-education" />
          <Education />
          <SectionDivider patternId="divider-certifications" />
          <Certifications />
          <SectionDivider patternId="divider-contact" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
