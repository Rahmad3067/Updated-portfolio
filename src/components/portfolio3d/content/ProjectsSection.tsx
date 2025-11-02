import React from "react";

interface ProjectsSectionProps {
  t: (key: string) => string;
  onDemoClick: (projectId: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ t, onDemoClick }) => {
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
    {
      id: "ecommerce-task-manager",
      title: t("projects.taskmanager.title"),
      description: t("projects.taskmanager.description"),
      technologies: ["React", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL"],
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
            <div className="project-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDemoClick(p.id);
                }}
              >
                🎮 Try Demo
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
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;

