export interface Task {
  id: string;
  title: string;
  description: string;
  category: "frontend" | "backend" | "database" | "devops" | "testing";
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "in-review" | "done";
  dueDate: string;
  assignee: string;
  tags: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Stats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byCategory: Record<string, number>;
  overdue: number;
}

