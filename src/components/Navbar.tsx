import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.css";

const Navbar: React.FC = () => {
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
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-language-switcher-desktop">
              <LanguageSwitcher />
            </div>
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
