import React from "react";
import { Project } from "./utils/projectHelpers";
import { getStatusColor, getStatusText } from "./utils/projectHelpers";

interface ProjectCardProps {
  project: Project;
  t: (key: string) => string;
  onViewDemo: (id: string) => void;
  onViewCode: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, t, onViewDemo, onViewCode }) => {
  return (
    <div className="project-card">
      <div className="card">
        {project.image && <img src={project.image} alt={project.title} className="project-image" />}
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <span
            className="project-status"
            style={{ color: getStatusColor(project.status) }}
          >
            {getStatusText(project.status, t)}
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
            onClick={() => onViewDemo(project.id)}
          >
            🎮 Try Demo
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onViewCode(project.id)}
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
  );
};

export default ProjectCard;

