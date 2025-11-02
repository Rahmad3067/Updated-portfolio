import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Footer from "./components/main/Footer";
import Hero from "./components/main/Hero";
import Navbar from "./components/main/Navbar";
import Portfolio3DNavigation from "./components/portfolio3d/Portfolio3DNavigation";
import Portfolio3DSimple from "./components/portfolio3d/Portfolio3DSimple";
import City3D from "./components/portfolio3d/City3D";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Chatbot from "./components/portfolio3d/Chatbot";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CarControlsProvider } from "./contexts/CarControlsContext";

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
      <CarControlsProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="App">
          {is3DMode ? (
            <>
              <City3D onSectionSelect={handleSectionSelect} onToggle3D={toggle3DMode} />
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
          <Chatbot />
        </div>
        </Router>
      </CarControlsProvider>
    </LanguageProvider>
  );
}

export default App;
