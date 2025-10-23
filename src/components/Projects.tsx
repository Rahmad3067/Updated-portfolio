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

  const handleViewCode = (projectId: string) => {
    // Define repository URLs or actions for each project
    const projectUrls: Record<string, string | null> = {
      "road-editor": null, // Repository not available yet
      "robot-interface": null, // Repository not available yet
      "roi-calculator": null, // Repository not available yet
      ycsos: null, // Repository not available yet
    };

    const url = projectUrls[projectId];

    if (url) {
      // Open repository in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Show modal with project information and contact details
      const projectNames: Record<string, string> = {
        "road-editor": "Road Editor Application",
        "robot-interface": "Robot Interface Manager",
        "roi-calculator": "ROI Calculator",
        ycsos: "Ycsos",
      };

      const projectName = projectNames[projectId] || projectId;

      // Create a more user-friendly modal instead of alert
      const modal = document.createElement("div");
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 2rem;
      `;

      modal.innerHTML = `
        <div style="
          background: #1a1a1a;
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        ">
          <h3 style="color: #667eea; margin: 0 0 1rem 0; font-size: 1.5rem;">
            📁 ${projectName}
          </h3>
          <p style="color: #cccccc; margin: 0 0 1.5rem 0; line-height: 1.6;">
            The source code for this project is currently not publicly available. 
            This project was developed as part of professional work and may contain 
            proprietary information.
          </p>
          <p style="color: #888888; margin: 0 0 1.5rem 0; font-size: 0.9rem;">
            For more information about this project or to discuss the implementation, 
            please contact me directly.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button id="close-modal-btn" 
                    style="
                      background: #667eea;
                      color: white;
                      border: none;
                      padding: 0.8rem 1.5rem;
                      border-radius: 8px;
                      cursor: pointer;
                      font-weight: 600;
                    ">
              Close
            </button>
            <button id="contact-modal-btn" 
                    style="
                      background: transparent;
                      color: #667eea;
                      border: 1px solid #667eea;
                      padding: 0.8rem 1.5rem;
                      border-radius: 8px;
                      cursor: pointer;
                      font-weight: 600;
                    ">
              Contact Me
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Add event listeners for the buttons
      const closeBtn = modal.querySelector("#close-modal-btn");
      const contactBtn = modal.querySelector("#contact-modal-btn");

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.remove();
        });
      }

      if (contactBtn) {
        contactBtn.addEventListener("click", () => {
          modal.remove();
          // Scroll to contact section
          const contactSection = document.querySelector("#contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      // Close modal when clicking outside
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
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
                    🎮 Try Demo
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewCode(project.id)}
                  >
                    📁 View Code
                  </button>
                </div>

                <div className="demo-notice">
                  <small>
                    💡 <strong>Note:</strong> This is a small interactive demo
                    showcasing the project's core functionality. It does not
                    represent the complete project with all features.
                  </small>
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
              <div className="demo-header-content">
                <h3>
                  {selectedDemo === "road-editor" &&
                    t("projects.roadeditor.title")}
                  {selectedDemo === "robot-interface" &&
                    t("projects.robotinterface.title")}
                  {selectedDemo === "roi-calculator" && t("projects.roi.title")}
                  {selectedDemo === "ycsos" && t("projects.ycsos.title")}
                </h3>
                <div className="demo-subtitle">
                  🎮 Interactive Demo - Core Functionality Preview
                </div>
              </div>
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
