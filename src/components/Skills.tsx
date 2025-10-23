import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./Skills.css";

interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

const Skills: React.FC = () => {
  const { t } = useLanguage();

  const skillCategories: SkillCategory[] = [
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
    {
      title: t("skills.databases"),
      skills: ["MySQL", "MongoDB"],
      icon: "🗄️",
    },
    {
      title: t("skills.methodology"),
      skills: ["Agile", "SCRUM"],
      icon: "📋",
    },
    {
      title: t("skills.operating"),
      skills: ["Windows", "Linux"],
      icon: "💾",
    },
  ];

  const languages = [
    {
      name: t("skills.language.french"),
      level: t("skills.level.delf_b1"),
      flag: "🇫🇷",
    },
    {
      name: t("skills.language.english"),
      level: t("skills.level.toeic_b2"),
      flag: "🇬🇧",
    },
    {
      name: t("skills.language.swedish"),
      level: t("skills.level.delf_b1"),
      flag: "🇸🇪",
    },
    {
      name: t("skills.language.farsi"),
      level: t("skills.level.bilingual"),
      flag: "🇮🇷",
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">{t("skills.title")}</h2>

        <div className="skills-content">
          <div className="technical-skills">
            <h3 className="skills-subtitle">{t("skills.technical")}</h3>
            <div className="skills-grid">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category">
                  <div className="card">
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <h4 className="category-title">{category.title}</h4>
                    </div>
                    <div className="skills-list">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="languages">
            <h3 className="skills-subtitle">{t("skills.languages")}</h3>
            <div className="languages-grid">
              {languages.map((language, index) => (
                <div key={index} className="language-item">
                  <div className="card">
                    <div className="language-header">
                      <span className="language-flag">{language.flag}</span>
                      <h4 className="language-name">{language.name}</h4>
                    </div>
                    <p className="language-level">{language.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
