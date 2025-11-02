import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Footer.css";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>{t("footer.title")}</h3>
            <p>{t("footer.subtitle")}</p>
            <p>{t("footer.subtitle2")}</p>
          </div>

          <div className="footer-links">
            <h4>{t("footer.navigation")}</h4>
            <ul>
              <li>
                <a href="#about">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#education">{t("nav.education")}</a>
              </li>
              <li>
                <a href="#experience">{t("nav.experience")}</a>
              </li>
              <li>
                <a href="#skills">{t("nav.skills")}</a>
              </li>
              <li>
                <a href="#projects">{t("nav.projects")}</a>
              </li>
              <li>
                <a href="#contact">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{t("footer.contact")}</h4>
            <div className="contact-links">
              <a href="mailto:aboozar919@gmail.com" className="contact-link">
                📧 aboozar919@gmail.com
              </a>
              <a href="tel:+33780569950" className="contact-link">
                📱 +33 7 80 56 99 50
              </a>
              <a
                href="https://www.linkedin.com/in/rahmad-abuzar-83a114214/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {t("footer.copyright")}
          </p>
          <p>{t("footer.developed")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
