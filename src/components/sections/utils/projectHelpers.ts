export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  image?: string;
}

export const getStatusColor = (status: string): string => {
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

export const getStatusText = (status: string, t: (key: string) => string): string => {
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

export const handleViewCode = (projectId: string) => {
  // Define repository URLs or actions for each project
  const projectUrls: Record<string, string | null> = {
    "road-editor": null, // Repository not available yet
    "robot-interface": null, // Repository not available yet
    "roi-calculator": null, // Repository not available yet
    ycsos: null, // Repository not available yet
    "ecommerce-task-manager": null, // Repository not available yet
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
      "ecommerce-task-manager": "E-Commerce Task Manager",
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

