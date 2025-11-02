import React from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "./utils/projectHelpers";

interface ProjectsSectionProps {
  title: string;
  subtitle: string;
  projects: Project[];
  t: (key: string) => string;
  onViewDemo: (id: string) => void;
  onViewCode: (id: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  title,
  subtitle,
  projects,
  t,
  onViewDemo,
  onViewCode,
}) => {
  return (
    <div className="projects-section">
      <h3 className="projects-section-title">{title}</h3>
      <p className="projects-section-subtitle">{subtitle}</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            t={t}
            onViewDemo={onViewDemo}
            onViewCode={onViewCode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;

