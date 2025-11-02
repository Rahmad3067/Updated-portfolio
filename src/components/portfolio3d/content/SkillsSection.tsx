import React from "react";

interface SkillsSectionProps {
  t: (key: string) => string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ t }) => {
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
      <div className="languages-section">
        <h3>{t("skills.languages")}</h3>
        <div className="languages-list">
          {languages.map((lang, li) => (
            <div key={li} className="language-item">
              <span>{lang.flag}</span>
              <strong>{lang.name}</strong>
              <span className="language-level"> - {lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;

