import React from "react";

interface EducationSectionProps {
  t: (key: string) => string;
}

const EducationSection: React.FC<EducationSectionProps> = ({ t }) => {
  const educationData = [
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
    <div className="section-content">
      <h2>{t("education.title")}</h2>
      <div className="education-timeline">
        {educationData.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="card">
              <div className="education-header">
                <span className="education-period">{item.period}</span>
                <h3 className="education-title">{item.title}</h3>
              </div>
              <div className="education-details">
                <h4 className="education-institution">{item.institution}</h4>
                {item.location && (
                  <p className="education-location">{item.location}</p>
                )}
                <p className="education-description">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;

