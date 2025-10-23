import React, { useState } from "react";
import "./YcsosDemo.css";

interface ProjectData {
  id: string;
  name: string;
  category: string;
  budget: number;
  duration: number;
  complexity: "low" | "medium" | "high";
  status: "planning" | "active" | "completed" | "on-hold";
  teamSize: number;
  technologies: string[];
  description: string;
}

const YcsosDemo: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "1",
      name: "E-commerce Platform",
      category: "Web Development",
      budget: 50000,
      duration: 6,
      complexity: "high",
      status: "active",
      teamSize: 5,
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      description: "Full-stack e-commerce solution with payment integration",
    },
    {
      id: "2",
      name: "Mobile App",
      category: "Mobile Development",
      budget: 30000,
      duration: 4,
      complexity: "medium",
      status: "planning",
      teamSize: 3,
      technologies: ["React Native", "Firebase", "Redux"],
      description: "Cross-platform mobile application for business management",
    },
    {
      id: "3",
      name: "Data Analytics Dashboard",
      category: "Data Science",
      budget: 25000,
      duration: 3,
      complexity: "medium",
      status: "completed",
      teamSize: 2,
      technologies: ["Python", "Django", "Chart.js", "PostgreSQL"],
      description: "Real-time analytics dashboard for business intelligence",
    },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    category: "",
    budget: 0,
    duration: 0,
    complexity: "medium" as "low" | "medium" | "high",
    teamSize: 1,
    technologies: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const addProject = () => {
    if (!newProject.name || !newProject.category) return;

    const project: ProjectData = {
      id: Date.now().toString(),
      name: newProject.name,
      category: newProject.category,
      budget: newProject.budget,
      duration: newProject.duration,
      complexity: newProject.complexity,
      status: "planning",
      teamSize: newProject.teamSize,
      technologies: newProject.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      description: newProject.description,
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "",
      category: "",
      budget: 0,
      duration: 0,
      complexity: "medium",
      teamSize: 1,
      technologies: "",
      description: "",
    });
    setShowForm(false);
  };

  const updateProjectStatus = (id: string, status: ProjectData["status"]) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "#FF9800";
      case "active":
        return "#4CAF50";
      case "completed":
        return "#2196F3";
      case "on-hold":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "#4CAF50";
      case "medium":
        return "#FF9800";
      case "high":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const calculateTotalBudget = () => {
    return projects.reduce((total, project) => total + project.budget, 0);
  };

  const calculateAverageDuration = () => {
    return projects.length > 0
      ? Math.round(
          projects.reduce((total, project) => total + project.duration, 0) /
            projects.length
        )
      : 0;
  };

  const getProjectStats = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;
    const totalTeamSize = projects.reduce(
      (total, project) => total + project.teamSize,
      0
    );

    return { totalProjects, activeProjects, completedProjects, totalTeamSize };
  };

  const stats = getProjectStats();

  return (
    <div className="ycsos-demo">
      <div className="demo-header">
        <h3>Ycsos - Project Management Tool</h3>
        <p>
          Collect information, perform calculations, and manage project
          estimations efficiently.
        </p>
      </div>

      <div className="demo-dashboard">
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-content">
              <div className="stat-value">{stats.activeProjects}</div>
              <div className="stat-label">Active Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.completedProjects}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-value">
                €{calculateTotalBudget().toLocaleString()}
              </div>
              <div className="stat-label">Total Budget</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-value">{calculateAverageDuration()}m</div>
              <div className="stat-label">Avg Duration</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalTeamSize}</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
        </div>

        <div className="demo-content">
          <div className="projects-section">
            <div className="section-header">
              <h4>Project Portfolio</h4>
              <button
                className="add-project-btn"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "+ Add Project"}
              </button>
            </div>

            {showForm && (
              <div className="project-form">
                <h5>Add New Project</h5>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget (€)</label>
                    <input
                      type="number"
                      value={newProject.budget}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          budget: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration (months)</label>
                    <input
                      type="number"
                      value={newProject.duration}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          duration: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Complexity</label>
                    <select
                      value={newProject.complexity}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          complexity: e.target.value as
                            | "low"
                            | "medium"
                            | "high",
                        })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Team Size</label>
                    <input
                      type="number"
                      value={newProject.teamSize}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          teamSize: parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      max="20"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          technologies: e.target.value,
                        })
                      }
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      placeholder="Project description..."
                      rows={3}
                    />
                  </div>
                </div>
                <button className="submit-btn" onClick={addProject}>
                  Add Project
                </button>
              </div>
            )}

            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`project-card ${
                    selectedProject === project.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject === project.id ? null : project.id
                    )
                  }
                >
                  <div className="project-header">
                    <div className="project-name">{project.name}</div>
                    <div
                      className="project-status"
                      style={{ color: getStatusColor(project.status) }}
                    >
                      {project.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="project-category">{project.category}</div>
                  <div className="project-details">
                    <div className="detail-row">
                      <span>Budget:</span>
                      <span>€{project.budget.toLocaleString()}</span>
                    </div>
                    <div className="detail-row">
                      <span>Duration:</span>
                      <span>{project.duration} months</span>
                    </div>
                    <div className="detail-row">
                      <span>Complexity:</span>
                      <span
                        style={{
                          color: getComplexityColor(project.complexity),
                        }}
                      >
                        {project.complexity.toUpperCase()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Team Size:</span>
                      <span>{project.teamSize} members</span>
                    </div>
                  </div>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.description && (
                    <div className="project-description">
                      {project.description}
                    </div>
                  )}
                  <div className="project-actions">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        updateProjectStatus(
                          project.id,
                          e.target.value as ProjectData["status"]
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="status-select"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YcsosDemo;
