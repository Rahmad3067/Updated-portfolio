export interface Task {
  id: string;
  title: string;
  category: "work" | "personal" | "health" | "learning" | "other";
  priority: "high" | "medium" | "low";
  duration: number; // in minutes
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  completedAt?: string;
}

export interface DailyLog {
  id: string;
  date: string;
  tasks: Task[];
  notes: string;
  productivity: number; // 0-100
  focusTime: number; // in minutes
}

export interface AISuggestion {
  id: string;
  taskId?: string;
  type: "priority" | "break" | "focus" | "summary";
  message: string;
  confidence: number; // 0-100
  timestamp: string;
}

export interface ProductivityStats {
  totalTasks: number;
  completedTasks: number;
  focusTime: number;
  productivity: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
}

