import { motion, useScroll } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import {
  Navbar,
  Hero,
  About,
  Skills,
  Services,
  Projects,
  Education,
  Certifications,
  Contact,
  Footer,
} from "./components";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        background: "linear-gradient(90deg, #2563EB, #10B981)",
        scaleX: scrollYProgress,
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
