import React from "react";

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ t }) => {
  return (
    <div className="section-content">
      <h1>Interactive Portfolio</h1>
      <p>
        {`$`}{/* keep line to preserve structure */}
        Navigate through space to explore my work. Click planets to open
        detailed content.
      </p>
      <div className="hero-buttons">
        <a href="#projects" className="btn btn-primary">
          {t("projects.title")}
        </a>
        <a href="#contact" className="btn btn-secondary">
          {t("nav.contact")}
        </a>
      </div>
    </div>
  );
};

export default HeroSection;

