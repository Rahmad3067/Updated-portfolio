import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Education.css";

interface EducationItem {
  period: string;
  title: string;
  institution: string;
  description: string;
  location?: string;
}

const Education: React.FC = () => {
  const { t } = useLanguage();

  const educationData: EducationItem[] = [
    {
      period: t("education.period.2021"),
      title: t("education.webdev.title"),
      institution: t("education.webdev.institution"),
      description: t("education.webdev.description"),
      location: t("education.location.paris"),
    },
    {
      period: t("education.period.2020"),
      title: t("education.digistart.title"),
      institution: t("education.digistart.institution"),
      description: t("education.digistart.description"),
      location: t("education.location.paris"),
    },
    {
      period: t("education.period.2019"),
      title: t("education.fle.title"),
      institution: t("education.fle.institution"),
      description: t("education.fle.description"),
      location: t("education.location.paris"),
    },
    {
      period: t("education.period.2018"),
      title: t("education.tech.title"),
      institution: t("education.tech.institution"),
      description: t("education.tech.description"),
      location: t("education.location.sweden"),
    },
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">{t("education.title")}</h2>
        <div className="education-timeline">
          {educationData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="card">
                  <div className="education-header">
                    <span className="education-period">{item.period}</span>
                    <h3 className="education-title">{item.title}</h3>
                  </div>
                  <div className="education-details">
                    <h4 className="education-institution">
                      {item.institution}
                    </h4>
                    {item.location && (
                      <p className="education-location">{item.location}</p>
                    )}
                    <p className="education-description">{item.description}</p>
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

export default Education;
