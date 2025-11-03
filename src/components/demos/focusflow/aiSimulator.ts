import { Task, DailyLog, AISuggestion } from "./types";

// Simulate OpenAI API for AI suggestions
export const generateAISuggestions = (
  tasks: Task[],
  dailyLogs: DailyLog[]
): AISuggestion[] => {
  const suggestions: AISuggestion[] = [];

  // Analyze tasks and generate suggestions
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const highPriorityTasks = pendingTasks.filter((t) => t.priority === "high");
  const workTasks = pendingTasks.filter((t) => t.category === "work");
  const totalDuration = pendingTasks.reduce((sum, t) => sum + t.duration, 0);

  // Priority suggestions
  if (highPriorityTasks.length > 0) {
    suggestions.push({
      id: `ai-${Date.now()}-1`,
      taskId: highPriorityTasks[0].id,
      type: "priority",
      message: `Start with "${highPriorityTasks[0].title}" - it's high priority and will give you momentum!`,
      confidence: 85,
      timestamp: new Date().toISOString(),
    });
  }

  // Break suggestions
  if (totalDuration > 120) {
    suggestions.push({
      id: `ai-${Date.now()}-2`,
      type: "break",
      message: "You have 2+ hours of work planned. Consider scheduling a 15-min break every 45 minutes to maintain focus.",
      confidence: 75,
      timestamp: new Date().toISOString(),
    });
  }

  // Focus time suggestions
  if (workTasks.length >= 3) {
    suggestions.push({
      id: `ai-${Date.now()}-3`,
      type: "focus",
      message: "You have multiple work tasks. Try batching similar tasks together for better flow state.",
      confidence: 80,
      timestamp: new Date().toISOString(),
    });
  }

  // Daily summary if there are completed tasks
  const completedToday = tasks.filter(
    (t) =>
      t.status === "completed" &&
      t.completedAt &&
      new Date(t.completedAt).toDateString() === new Date().toDateString()
  );

  if (completedToday.length > 0) {
    const completionRate = (completedToday.length / tasks.length) * 100;
    suggestions.push({
      id: `ai-${Date.now()}-4`,
      type: "summary",
      message: `Great progress! You've completed ${completedToday.length} task${completedToday.length > 1 ? "s" : ""} today (${completionRate.toFixed(0)}% completion rate). Keep up the momentum!`,
      confidence: 90,
      timestamp: new Date().toISOString(),
    });
  }

  return suggestions;
};

// Simulate AI-powered daily planner
export const generateDailyPlan = (
  tasks: Task[],
  availableHours: number = 8
): string => {
  const pendingTasks = tasks
    .filter((t) => t.status === "pending")
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  if (pendingTasks.length === 0) {
    return "🎉 No pending tasks! Consider reviewing your goals or planning for tomorrow.";
  }

  const totalMinutes = availableHours * 60;
  let scheduledMinutes = 0;
  const plan: string[] = [];

  plan.push(
    `📅 AI-Generated Daily Plan for ${availableHours} hours:\n`
  );

  for (const task of pendingTasks) {
    if (scheduledMinutes + task.duration <= totalMinutes) {
      const startTime = Math.floor(scheduledMinutes / 60) + 9; // Start at 9 AM
      const startMinutes = scheduledMinutes % 60;
      plan.push(
        `⏰ ${startTime}:${startMinutes.toString().padStart(2, "0")} - ${task.title} (${task.duration} min, ${task.priority} priority)`
      );
      scheduledMinutes += task.duration;
    }
  }

  const remainingMinutes = totalMinutes - scheduledMinutes;
  if (remainingMinutes > 30) {
    plan.push(
      `\n💡 You have ${remainingMinutes} minutes available. Good time for breaks or unexpected tasks!`
    );
  }

  return plan.join("\n");
};

// Simulate smart summary generation
export const generateSmartSummary = (dailyLogs: DailyLog[]): string => {
  if (dailyLogs.length === 0) {
    return "No logs available yet. Start logging your activities!";
  }

  const recentLogs = dailyLogs.slice(0, 7); // Last 7 days
  const totalTasks = recentLogs.reduce(
    (sum, log) => sum + log.tasks.length,
    0
  );
  const completedTasks = recentLogs.reduce(
    (sum, log) => sum + log.tasks.filter((t) => t.status === "completed").length,
    0
  );
  const avgProductivity =
    recentLogs.reduce((sum, log) => sum + log.productivity, 0) /
    recentLogs.length;

  return `📊 Weekly Summary (Last 7 Days):
• Total tasks planned: ${totalTasks}
• Completion rate: ${((completedTasks / totalTasks) * 100).toFixed(0)}%
• Average productivity: ${avgProductivity.toFixed(0)}%
• Best day: ${recentLogs.sort((a, b) => b.productivity - a.productivity)[0]?.date || "N/A"}

${completedTasks / totalTasks > 0.7 ? "🌟 Excellent consistency! You're maintaining great momentum." : "💪 Good progress! Small improvements each day lead to big results."}`;
};

