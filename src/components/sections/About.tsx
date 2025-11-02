import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./About.css";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{t("about.title")}</h2>
        <div className="about-content">
          <div className="about-text">
            <div className="card">
              <h3>{t("about.presentation")}</h3>
              <p>{t("about.presentation.text1")}</p>
              <p>{t("about.presentation.text2")}</p>
            </div>
          </div>
          <div className="about-info">
            <div className="card">
              <h3>{t("about.personal")}</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">{t("about.fullname")}</span>
                  <span className="info-value">Rahmad ABUZAR</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("about.age")}</span>
                  <span className="info-value">24 ans (12/11/2000)</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("about.location")}</span>
                  <span className="info-value">
                    Paris
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("about.phone")}</span>
                  <span className="info-value">+33 7 80 56 99 50</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("about.email")}</span>
                  <span className="info-value">aboozar919@gmail.com</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t("about.linkedin")}</span>
                  <a
                    href="https://www.linkedin.com/in/rahmad-abuzar-83a114214/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    rahmad-abuzar-83a114214
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
