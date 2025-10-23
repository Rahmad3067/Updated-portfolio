import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import RoadEditorDemo from "./demos/RoadEditorDemo";
import RobotInterfaceDemo from "./demos/RobotInterfaceDemo";
import ROICalculatorDemo from "./demos/ROICalculatorDemo";
import YcsosDemo from "./demos/YcsosDemo";
import "./Projects.css";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  image?: string;
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "road-editor",
      title: t("projects.roadeditor.title"),
      description: t("projects.roadeditor.description"),
      technologies: ["React", "TypeScript", "MUI", "Three.js"],
      status: "completed",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "planned":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t("projects.status.completed");
      case "in-progress":
        return t("projects.status.inprogress");
      case "planned":
        return t("projects.status.planned");
      default:
        return "Inconnu";
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t("projects.title")}</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span
                    className="project-status"
                    style={{ color: getStatusColor(project.status) }}
                  >
                    {getStatusText(project.status)}
                  </span>
                </div>

                <div className="project-image">
                  <div className="project-placeholder">
                    <span className="placeholder-text">
                      {t("projects.placeholder")}
                    </span>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  <h4>{t("projects.technologies")}</h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedDemo(project.id)}
                  >
                    {t("projects.actions.view")}
                  </button>
                  <button className="btn btn-secondary">
                    {t("projects.actions.source")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Modals */}
      {selectedDemo && (
        <div
          className="demo-modal-overlay"
          onClick={() => setSelectedDemo(null)}
        >
          <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <h3>
                {selectedDemo === "road-editor" &&
                  t("projects.roadeditor.title")}
                {selectedDemo === "robot-interface" &&
                  t("projects.robotinterface.title")}
                {selectedDemo === "roi-calculator" && t("projects.roi.title")}
                {selectedDemo === "ycsos" && t("projects.ycsos.title")}
              </h3>
              <button
                className="demo-modal-close"
                onClick={() => setSelectedDemo(null)}
              >
                ×
              </button>
            </div>
            <div className="demo-modal-content">
              {selectedDemo === "road-editor" && <RoadEditorDemo />}
              {selectedDemo === "robot-interface" && <RobotInterfaceDemo />}
              {selectedDemo === "roi-calculator" && <ROICalculatorDemo />}
              {selectedDemo === "ycsos" && <YcsosDemo />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
