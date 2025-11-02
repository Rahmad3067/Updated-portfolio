import React from "react";

interface AboutSectionProps {
  t: (key: string) => string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ t }) => {
  return (
    <div className="section-content">
      <div className="about-details">
        <div className="detail-item">
          <h3>{t("about.presentation")}</h3>
          <p>{t("about.presentation.text1")}</p>
          <p>{t("about.presentation.text2")}</p>
        </div>
        <div className="detail-item">
          <h3>{t("about.personal")}</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>{t("about.fullname")}</strong> Rahmad ABUZAR
            </div>
            <div className="info-item">
              <strong>{t("about.age")}</strong> 24 ans (12/11/2000)
            </div>
            <div className="info-item">
              <strong>{t("about.location")}</strong> Paris
            </div>
            <div className="info-item">
              <strong>{t("about.phone")}</strong> +33 7 80 56 99 50
            </div>
            <div className="info-item">
              <strong>{t("about.email")}</strong> aboozar919@gmail.com
            </div>
            <div className="info-item">
              <strong>{t("about.linkedin")}</strong>
              <a
                href="https://www.linkedin.com/in/rahmad-abuzar-83a114214/"
                target="_blank"
                rel="noopener noreferrer"
              >
                rahmad-abuzar-83a114214
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

