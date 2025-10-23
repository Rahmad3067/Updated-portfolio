import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Contact.css";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: "📧",
      label: t("contact.labels.email"),
      value: "aboozar919@gmail.com",
      link: "mailto:aboozar919@gmail.com",
    },
    {
      icon: "📱",
      label: t("contact.labels.phone"),
      value: "+33 7 80 56 99 50",
      link: "tel:+33780569950",
    },
    {
      icon: "📍",
      label: t("contact.labels.location"),
      value: "6B Rue leon 94270 blum le kremlin bicetre",
      link: null,
    },
    {
      icon: "💼",
      label: t("contact.labels.linkedin"),
      value: "rahmad-abuzar-83a114214",
      link: "https://www.linkedin.com/in/rahmad-abuzar-83a114214/",
    },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t("contact.title")}</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="card">
              <h3>{t("contact.info.title")}</h3>
              <p className="contact-description">
                {t("contact.info.description")}
              </p>
              <div className="contact-details">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-text">
                      <span className="contact-label">{item.label}</span>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="contact-value"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="card">
              <h3>{t("contact.form.title")}</h3>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">{t("contact.form.name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={t("contact.form.name.placeholder")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t("contact.form.email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={t("contact.form.email.placeholder")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t("contact.form.subject")}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder={t("contact.form.subject.placeholder")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t("contact.form.message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t("contact.form.message.placeholder")}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  {t("contact.form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
