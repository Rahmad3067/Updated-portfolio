import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Portfolio3DNavigation.css";

interface Portfolio3DNavigationProps {
  onSectionSelect: (sectionId: string) => void;
  currentSection: string;
  onToggle3D: () => void;
  is3DMode: boolean;
}

const Portfolio3DNavigation: React.FC<Portfolio3DNavigationProps> = ({
  onSectionSelect,
  currentSection,
  onToggle3D,
  is3DMode,
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(is3DMode); // Collapsed by default in 3D mode

  const sections = [
    { id: "hero", name: t("nav.home"), icon: "🏠" },
    { id: "about", name: t("nav.about"), icon: "👨‍💻" },
    { id: "experience", name: t("nav.experience"), icon: "💼" },
    { id: "skills", name: t("nav.skills"), icon: "⚡" },
    { id: "projects", name: t("nav.projects"), icon: "🛠️" },
    { id: "education", name: t("nav.education"), icon: "🎓" },
    { id: "contact", name: t("nav.contact"), icon: "📧" },
  ];

  useEffect(() => {
    // In 3D mode, collapse by default
    setIsCollapsed(is3DMode);
  }, [is3DMode]);

  useEffect(() => {
    if (!is3DMode) {
      const handleScroll = () => {
        setIsVisible(window.scrollY < 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [is3DMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionSelect(sectionId);
    }
  };

  return (
    <div className={`portfolio-3d-nav ${isVisible ? "visible" : "hidden"} ${isCollapsed ? "collapsed" : ""}`}>
      <div className="nav-container">
        <div className="nav-header">
          {!isCollapsed && <h3 className="nav-title">Portfolio Navigation</h3>}
          <div className="nav-header-buttons">
            <button
              className={`nav-toggle-collapse`}
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            >
              {isCollapsed ? "▶" : "◀"}
            </button>
            <button
              className={`nav-toggle-3d ${is3DMode ? "active" : ""}`}
              onClick={onToggle3D}
              title={is3DMode ? "Switch to 2D" : "Switch to 3D"}
            >
              {is3DMode ? "🌍" : "🚀"}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            <div className="nav-sections">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`nav-section ${
                    currentSection === section.id ? "active" : ""
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-name">{section.name}</span>
                </button>
              ))}
            </div>

            <div className="nav-footer">
              <p className="nav-instructions">
                {is3DMode
                  ? "🖱️ Click planets to explore • Drag to rotate • Scroll to zoom"
                  : "📱 Scroll to navigate • Click sections to jump"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio3DNavigation;

