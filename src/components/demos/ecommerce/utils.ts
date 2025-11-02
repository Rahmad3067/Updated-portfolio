import { Stats, Task } from "./types";

export const calculateStats = (tasks: Task[]): Stats => {
  const stats: Stats = {
    total: tasks.length,
    byStatus: {},
    byPriority: {},
    byCategory: {},
    overdue: 0,
  };

  tasks.forEach((task) => {
    // Status counts
    stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;

    // Priority counts
    stats.byPriority[task.priority] =
      (stats.byPriority[task.priority] || 0) + 1;

    // Category counts
    stats.byCategory[task.category] =
      (stats.byCategory[task.category] || 0) + 1;

    // Overdue count
    if (new Date(task.dueDate) < new Date() && task.status !== "done") {
      stats.overdue++;
    }
  });

  return stats;
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "urgent":
      return "#dc2626";
    case "high":
      return "#ea580c";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "frontend":
      return "🎨";
    case "backend":
      return "⚙️";
    case "database":
      return "💾";
    case "devops":
      return "🚀";
    case "testing":
      return "🧪";
    default:
      return "📋";
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case "todo":
      return "To Do";
    case "in-progress":
      return "In Progress";
    case "in-review":
      return "In Review";
    case "done":
      return "Done";
    default:
      return status;
  }
};

