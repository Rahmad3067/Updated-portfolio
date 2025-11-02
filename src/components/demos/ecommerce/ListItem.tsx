import React from "react";
import { Task } from "./types";
import { getCategoryIcon, getPriorityColor } from "./utils";

interface ListItemProps {
  task: Task;
  selectedTask: string | null;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  selectedTask,
  onTaskClick,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div
      key={task.id}
      className="list-item"
      onClick={() => onTaskClick(selectedTask === task.id ? "" : task.id)}
    >
      <div className="list-item-content">
        <div className="list-item-main">
          <div className="list-item-icon">
            {getCategoryIcon(task.category)}
          </div>
          <div className="list-item-info">
            <div className="list-item-title">{task.title}</div>
            <div className="list-item-meta">
              <span
                className="priority-badge"
                style={{
                  backgroundColor: getPriorityColor(task.priority),
                }}
              >
                {task.priority}
              </span>
              <span className="list-item-assignee">👤 {task.assignee}</span>
              <span className="list-item-date">
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="list-item-actions">
          <select
            className="status-select"
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
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
          >
            🗑️
          </button>
        </div>
      </div>
      {selectedTask === task.id && (
        <div className="list-item-expanded">
          <div className="expanded-description">{task.description}</div>
          <div className="expanded-tags">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {task.comments.length > 0 && (
            <div className="expanded-comments">
              <strong>Comments:</strong>
              {task.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <span className="comment-author">{comment.author}:</span>{" "}
                  {comment.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListItem;

