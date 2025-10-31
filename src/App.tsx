import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio3DNavigation from "./components/Portfolio3DNavigation";
import Portfolio3DSimple from "./components/Portfolio3DSimple";
import City3D from "./components/City3D";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  const [is3DMode, setIs3DMode] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  const handleSectionSelect = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (!is3DMode) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggle3DMode = () => {
    setIs3DMode(!is3DMode);
  };

  // Handle scroll detection for current section
  useEffect(() => {
    if (is3DMode) return;

    const sections = [
      "hero",
      "about",
      "education",
      "experience",
      "skills",
      "projects",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [is3DMode]);

  return (
    <LanguageProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          {is3DMode ? (
            <>
              <City3D onSectionSelect={handleSectionSelect} />
            </>
          ) : (
            <>
              <Navbar
                is3DMode={is3DMode}
                onToggle3D={toggle3DMode}
              />
              <main>
                <Hero />
                <About />
                <Education />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
