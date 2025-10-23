import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Experience.css";

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  location?: string;
}

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const experienceData: ExperienceItem[] = [
    {
      period: t("experience.balyo.period"),
      title: t("experience.balyo.title"),
      company: t("experience.balyo.company"),
      description: t("experience.balyo.description"),
      technologies: [
        "React",
        "TypeScript",
        "MUI",
        "Python",
        "Django",
        "Three.js",
      ],
      location: t("experience.balyo.location"),
    },
    {
      period: t("experience.datoscout.period"),
      title: t("experience.datoscout.title"),
      company: t("experience.datoscout.company"),
      description: t("experience.datoscout.description"),
      technologies: ["Python", "Django", "HTMX", "Django REST-API"],
      location: t("experience.datoscout.location"),
    },
    {
      period: t("experience.hairdresser.period"),
      title: t("experience.hairdresser.title"),
      company: t("experience.hairdresser.company"),
      description: t("experience.hairdresser.description"),
      technologies: [],
      location: t("experience.location.karlskrona"),
    },
    {
      period: t("experience.mcdonalds.period"),
      title: t("experience.mcdonalds.title"),
      company: t("experience.mcdonalds.company"),
      description: t("experience.mcdonalds.description"),
      technologies: [],
      location: t("experience.location.karlskrona"),
    },
    {
      period: t("experience.elgiganten.period"),
      title: t("experience.elgiganten.title"),
      company: t("experience.elgiganten.company"),
      description: t("experience.elgiganten.description"),
      technologies: [],
      location: t("experience.location.karlskrona"),
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">{t("experience.title")}</h2>
        <div className="experience-timeline">
          {experienceData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="card">
                  <div className="experience-header">
                    <span className="experience-period">{item.period}</span>
                    <h3 className="experience-title">{item.title}</h3>
                  </div>
                  <div className="experience-details">
                    <h4 className="experience-company">{item.company}</h4>
                    {item.location && (
                      <p className="experience-location">{item.location}</p>
                    )}
                    <p className="experience-description">{item.description}</p>
                    {item.technologies.length > 0 && (
                      <div className="technologies">
                        <h5>{t("experience.technologies")}</h5>
                        <div className="tech-tags">
                          {item.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
