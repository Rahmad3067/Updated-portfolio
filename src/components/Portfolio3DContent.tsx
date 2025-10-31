import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Portfolio3DContent.css";

interface Portfolio3DContentProps {
  selectedSection: string | null;
  onClose: () => void;
}

const Portfolio3DContent: React.FC<Portfolio3DContentProps> = ({
  selectedSection,
  onClose,
}) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedSection) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedSection]);

  const renderContent = () => {
    switch (selectedSection) {
      case "hero":
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
      case "about":
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
      case "experience":
        const experienceData = [
          {
            period: t("experience.balyo.period"),
            title: t("experience.balyo.title"),
            company: t("experience.balyo.company"),
            description: t("experience.balyo.description"),
            technologies: ["React", "TypeScript", "MUI", "Python", "Django", "Three.js"],
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
          <div className="section-content">
            <h2>{t("experience.title")}</h2>
            <div className="experience-timeline">
              {experienceData.map((item, i) => (
                <div key={i} className="timeline-item">
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
                            {item.technologies.map((tech, ti) => (
                              <span key={ti} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "skills":
        const skillCategories = [
          {
            title: t("skills.programming"),
            skills: [
              "Python",
              "HTML",
              "CSS",
              "XML",
              "JavaScript",
              "TypeScript",
              "Django",
              "Three.js",
              "Node.js",
            ],
            icon: "💻",
          },
          {
            title: t("skills.development"),
            skills: [
              "Visual Studio Code",
              "GitLab",
              "Docker",
              "Codeblocks",
              "PhpStorm",
              "Ubuntu",
              "WSL",
            ],
            icon: "🛠️",
          },
          { title: t("skills.databases"), skills: ["MySQL", "MongoDB"], icon: "🗄️" },
          { title: t("skills.methodology"), skills: ["Agile", "SCRUM"], icon: "📋" },
          { title: t("skills.operating"), skills: ["Windows", "Linux"], icon: "💾" },
        ];
        const languages = [
          { name: t("skills.language.french"), level: t("skills.level.delf_b1"), flag: "🇫🇷" },
          { name: t("skills.language.english"), level: t("skills.level.toeic_b2"), flag: "🇬🇧" },
          { name: t("skills.language.swedish"), level: t("skills.level.delf_b1"), flag: "🇸🇪" },
          { name: t("skills.language.farsi"), level: t("skills.level.bilingual"), flag: "🇮🇷" },
        ];
        return (
          <div className="section-content">
            <h2>{t("skills.title")}</h2>
            <div className="skills-grid">
              {skillCategories.map((cat, i) => (
                <div key={i} className="skill-category">
                  <h3>
                    <span style={{ marginRight: 8 }}>{cat.icon}</span>
                    {cat.title}
                  </h3>
                  <div className="skill-tags">
                    {cat.skills.map((s, si) => (
                      <span key={si} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <h3 style={{ marginTop: 24 }}>{t("skills.languages")}</h3>
            <div className="skills-grid">
              {languages.map((lng, i) => (
                <div key={i} className="skill-category">
                  <h4>
                    <span style={{ marginRight: 8 }}>{lng.flag}</span>
                    {lng.name}
                  </h4>
                  <p>{lng.level}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "projects":
        const projects = [
          {
            id: "road-editor",
            title: t("projects.roadeditor.title"),
            description: t("projects.roadeditor.description"),
            technologies: ["React", "TypeScript", "MUI", "Three.js"],
            status: t("projects.status.completed"),
            image: `${process.env.PUBLIC_URL || ''}/images/road%20editor%20image.jfif`,
          },
          {
            id: "robot-interface",
            title: t("projects.robotinterface.title"),
            description: t("projects.robotinterface.description"),
            technologies: ["React", "TypeScript", "MUI", "Three.js"],
            status: t("projects.status.completed"),
          },
          {
            id: "roi-calculator",
            title: t("projects.roi.title"),
            description: t("projects.roi.description"),
            technologies: ["Python", "Django", "Tailwind"],
            status: t("projects.status.completed"),
          },
          {
            id: "ycsos",
            title: t("projects.ycsos.title"),
            description: t("projects.ycsos.description"),
            technologies: ["Python", "Django", "Tailwind"],
            status: t("projects.status.completed"),
          },
        ];
        return (
          <div className="section-content">
            <div className="projects-grid">
              {projects.map((p) => (
                <div key={p.id} className="project-card">
                  {p.image && <img src={p.image} alt={p.title} className="project-image" />}
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-tech">
                    {p.technologies.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "education":
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
      case "contact":
        const contactInfo = [
          { icon: "📧", label: t("contact.labels.email"), value: "aboozar919@gmail.com", link: "mailto:aboozar919@gmail.com" },
          { icon: "📱", label: t("contact.labels.phone"), value: "+33 7 80 56 99 50", link: "tel:+33780569950" },
          { icon: "📍", label: t("contact.labels.location"), value: "Paris", link: null },
          { icon: "💼", label: t("contact.labels.linkedin"), value: "rahmad-abuzar-83a114214", link: "https://www.linkedin.com/in/rahmad-abuzar-83a114214/" },
        ];
        return (
          <div className="section-content">
            <h2>{t("contact.title")}</h2>
            <p>{t("contact.info.description")}</p>
            <div className="contact-info">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-item">
                  <span style={{ marginRight: 8 }}>{item.icon}</span>
                  <strong style={{ marginRight: 8 }}>{item.label}</strong>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!selectedSection || !isVisible) return null;

  return (
    <div className={`portfolio-3d-content ${isVisible ? "visible" : "hidden"}`}>
      <div className="content-overlay" onClick={onClose}></div>
      <div className="content-modal">
        <div className="content-header">
          <h2 className="content-title">
            {selectedSection === "hero" && "Welcome"}
            {selectedSection === "about" && t("nav.about")}
            {selectedSection === "experience" && t("nav.experience")}
            {selectedSection === "skills" && t("nav.skills")}
            {selectedSection === "projects" && t("nav.projects")}
            {selectedSection === "education" && t("nav.education")}
            {selectedSection === "contact" && t("nav.contact")}
          </h2>
          <button className="content-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="content-body">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Portfolio3DContent;
