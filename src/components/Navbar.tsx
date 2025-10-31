import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.css";

interface NavbarProps {
  is3DMode?: boolean;
  onToggle3D?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ is3DMode = false, onToggle3D }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">Rahmad</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <a
              href="#about"
              onClick={() => scrollToSection("about")}
              className="nav-link"
            >
              {t("nav.about")}
            </a>
            <a
              href="#education"
              onClick={() => scrollToSection("education")}
              className="nav-link"
            >
              {t("nav.education")}
            </a>
            <a
              href="#experience"
              onClick={() => scrollToSection("experience")}
              className="nav-link"
            >
              {t("nav.experience")}
            </a>
            <a
              href="#skills"
              onClick={() => scrollToSection("skills")}
              className="nav-link"
            >
              {t("nav.skills")}
            </a>
            <a
              href="#projects"
              onClick={() => scrollToSection("projects")}
              className="nav-link"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              onClick={() => scrollToSection("contact")}
              className="nav-link"
            >
              {t("nav.contact")}
            </a>
            <div className="nav-language-switcher">
              <LanguageSwitcher />
              {onToggle3D && (
                <button
                  className={`nav-toggle-3d-mobile ${is3DMode ? "active" : ""}`}
                  onClick={onToggle3D}
                  title={is3DMode ? "Switch to 2D" : "Switch to 3D (new)"}
                >
                  {is3DMode ? "🌍" : (
                    <>
                      <span className="nav-toggle-icon">🚀</span>
                      <span className="nav-toggle-text-mobile">Switch to 3D (new)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-language-switcher-desktop">
              <LanguageSwitcher />
            </div>
            {onToggle3D && (
              <button
                className={`nav-toggle-3d ${is3DMode ? "active" : ""}`}
                onClick={onToggle3D}
                title={is3DMode ? "Switch to 2D" : "Switch to 3D"}
              >
                {is3DMode ? (
                  "🌍"
                ) : (
                  <>
                    <span className="nav-toggle-icon">🚀</span>
                    <span className="nav-toggle-text">Switch to 3D (new)</span>
                  </>
                )}
              </button>
            )}
            <div
              className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
