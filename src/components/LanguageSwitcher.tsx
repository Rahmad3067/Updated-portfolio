import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: "fr" | "en") => {
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === "fr" ? "active" : ""}`}
        onClick={() => handleLanguageChange("fr")}
        title="Français"
      >
        🇫🇷
      </button>
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => handleLanguageChange("en")}
        title="English"
      >
        🇬🇧
      </button>
    </div>
  );
};

export default LanguageSwitcher;
