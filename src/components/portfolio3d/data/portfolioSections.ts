export interface PortfolioSection {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  icon: string;
  description: string;
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "hero",
    name: "Welcome",
    position: [0, 0, 0],
    color: "#4f46e5",
    icon: "🚀",
    description: "Welcome to my portfolio",
  },
  {
    id: "about",
    name: "About Me",
    position: [8, 2, -5],
    color: "#10b981",
    icon: "👨‍💻",
    description: "Learn about me",
  },
  {
    id: "experience",
    name: "Experience",
    position: [-8, 1, -3],
    color: "#f59e0b",
    icon: "💼",
    description: "My work experience",
  },
  {
    id: "skills",
    name: "Skills",
    position: [5, -2, 8],
    color: "#8b5cf6",
    icon: "⚡",
    description: "Technical skills",
  },
  {
    id: "projects",
    name: "Projects",
    position: [-5, -1, 6],
    color: "#ef4444",
    icon: "🛠️",
    description: "My projects",
  },
  {
    id: "education",
    name: "Education",
    position: [0, -4, -8],
    color: "#06b6d4",
    icon: "🎓",
    description: "Educational background",
  },
  {
    id: "contact",
    name: "Contact",
    position: [0, 3, 10],
    color: "#ec4899",
    icon: "📧",
    description: "Get in touch",
  },
];

