import { ProductivityStats, Task, DailyLog } from "./types";

export const calculateProductivity = (
  completedTasks: number,
  totalTasks: number,
  focusTime: number,
  planTime: number
): number => {
  if (totalTasks === 0) return 0;

  const completionRate = (completedTasks / totalTasks) * 100;
  const focusRate = planTime > 0 ? (focusTime / planTime) * 100 : 0;

  return Math.round((completionRate * 0.7 + Math.min(focusRate, 100) * 0.3));
};

export const calculateStats = (
  tasks: Task[],
  dailyLogs: DailyLog[]
): ProductivityStats => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  // Calculate focus time from completed tasks
  const focusTime = tasks
    .filter((t) => t.status === "completed" && t.completedAt)
    .reduce((sum, t) => sum + t.duration, 0);

  // Calculate planned time
  const planTime = tasks.reduce((sum, t) => sum + t.duration, 0);

  const productivity = calculateProductivity(
    completedTasks,
    totalTasks,
    focusTime,
    planTime
  );

  // Group by category
  const byCategory: Record<string, number> = {};
  tasks.forEach((task) => {
    byCategory[task.category] = (byCategory[task.category] || 0) + 1;
  });

  // Group by priority
  const byPriority: Record<string, number> = {};
  tasks.forEach((task) => {
    byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
  });

  return {
    totalTasks,
    completedTasks,
    focusTime,
    productivity,
    byCategory,
    byPriority,
  };
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "work":
      return "💼";
    case "personal":
      return "👤";
    case "health":
      return "🏃";
    case "learning":
      return "📚";
    case "other":
      return "📋";
    default:
      return "📌";
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "work":
      return "#4f46e5"; // indigo-600 for professional blue
    case "personal":
      return "#a855f7"; // purple-500
    case "health":
      return "#22c55e"; // green-500
    case "learning":
      return "#f59e0b"; // amber-500
    case "other":
      return "#6b7280"; // gray-500
    default:
      return "#9ca3af";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "#dc2626"; // red-600 for better contrast
    case "medium":
      return "#d97706"; // amber-600
    case "low":
      return "#16a34a"; // green-600
    default:
      return "#6b7280";
  }
};

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

