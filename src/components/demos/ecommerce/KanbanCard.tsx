import React from "react";
import { Task } from "./types";
import { getCategoryIcon, getPriorityColor } from "./utils";

interface KanbanCardProps {
  task: Task;
  selectedTask: string | null;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  selectedTask,
  onTaskClick,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div
      key={task.id}
      className="task-card"
      onClick={() => onTaskClick(selectedTask === task.id ? "" : task.id)}
    >
      <div className="task-header">
        <div className="task-category">
          {getCategoryIcon(task.category)} {task.category}
        </div>
        <button
          className="task-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        >
          ×
        </button>
      </div>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-tags">
        {task.tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="task-footer">
        <div
          className="priority-badge"
          style={{
            backgroundColor: getPriorityColor(task.priority),
          }}
        >
          {task.priority}
        </div>
        <div className="task-assignee">👤 {task.assignee}</div>
        <div className="task-due-date">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </div>
        <select
          className="task-status-select"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          onClick={(e) => e.stopPropagation()}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="in-review">In Review</option>
          <option value="done">Done</option>
        </select>
      </div>
      {selectedTask === task.id && (
        <div className="task-details">
          <div className="details-section">
            <strong>Comments:</strong>
            {task.comments.length > 0 ? (
              task.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanCard;

