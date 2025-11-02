import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectsSection from "./ProjectsSection";
import DemosModal from "./DemosModal";
import { handleViewCode } from "./utils/projectHelpers";
import { Project } from "./utils/projectHelpers";
import "./Projects.css";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  // Work Projects (Professional)
  const workProjects: Project[] = [
    {
      id: "road-editor",
      title: t("projects.roadeditor.title"),
      description: t("projects.roadeditor.description"),
      technologies: ["React", "TypeScript", "MUI", "Three.js"],
      status: "completed",
      image: `${process.env.PUBLIC_URL || ''}/images/road%20editor%20image.jfif`,
    },
    {
      id: "robot-interface",
      title: t("projects.robotinterface.title"),
      description: t("projects.robotinterface.description"),
      technologies: ["React", "TypeScript", "MUI", "Three.js"],
      status: "completed",
    },
    {
      id: "roi-calculator",
      title: t("projects.roi.title"),
      description: t("projects.roi.description"),
      technologies: ["Python", "Django", "Tailwind"],
      status: "completed",
    },
    {
      id: "ycsos",
      title: t("projects.ycsos.title"),
      description: t("projects.ycsos.description"),
      technologies: ["Python", "Django", "Tailwind"],
      status: "completed",
    },
  ];

  // Personal Projects
  const personalProjects: Project[] = [
    {
      id: "ecommerce-task-manager",
      title: t("projects.taskmanager.title"),
      description: t("projects.taskmanager.description"),
      technologies: ["React", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL"],
      status: "completed",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t("projects.title")}</h2>
        
        <ProjectsSection
          title={t("projects.workprojects.title")}
          subtitle={t("projects.workprojects.subtitle")}
          projects={workProjects}
          t={t}
          onViewDemo={setSelectedDemo}
          onViewCode={handleViewCode}
        />

        <ProjectsSection
          title={t("projects.personalprojects.title")}
          subtitle={t("projects.personalprojects.subtitle")}
          projects={personalProjects}
          t={t}
          onViewDemo={setSelectedDemo}
          onViewCode={handleViewCode}
        />
      </div>

      <DemosModal
        selectedDemo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
      />
    </section>
  );
};

export default Projects;
