import React from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

interface ContentRendererProps {
  section: string | null;
  t: (key: string) => string;
  onDemoClick: (projectId: string) => void;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ section, t, onDemoClick }) => {
  switch (section) {
    case "hero":
      return <HeroSection t={t} />;
    case "about":
      return <AboutSection t={t} />;
    case "experience":
      return <ExperienceSection t={t} />;
    case "skills":
      return <SkillsSection t={t} />;
    case "projects":
      return <ProjectsSection t={t} onDemoClick={onDemoClick} />;
    case "education":
      return <EducationSection t={t} />;
    case "contact":
      return <ContactSection t={t} />;
    default:
      return null;
  }
};

export default ContentRenderer;

