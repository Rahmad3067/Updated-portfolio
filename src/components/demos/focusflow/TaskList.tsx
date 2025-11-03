import React from "react";
import { Task } from "./types";
import { formatTime, getCategoryColor, getCategoryIcon, getPriorityColor } from "./utils";

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange }) => {
  const getStatusIcon = (status: Task["status"]): string => {
    switch (status) {
      case "completed":
        return "✅";
      case "in-progress":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "📌";
    }
  };

  return (
    <div className="focusflow-tasks">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item task-${task.status}`}
        >
          <div className="task-content">
            <div className="task-header">
              <span
                className="category-badge"
                style={{
                  backgroundColor: getCategoryColor(task.category),
                }}
              >
                {getCategoryIcon(task.category)} {task.category}
              </span>
              <span
                className="priority-badge"
                style={{
                  backgroundColor: getPriorityColor(task.priority),
                }}
              >
                {task.priority}
              </span>
            </div>
            <div className="task-title">{task.title}</div>
            <div className="task-meta">
              <span className="task-duration">⏱️ {formatTime(task.duration)}</span>
              <span className="task-status">
                {getStatusIcon(task.status)} {task.status}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <select
              className="status-select"
              value={task.status}
              onChange={(e) =>
                onStatusChange(task.id, e.target.value as Task["status"])
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

