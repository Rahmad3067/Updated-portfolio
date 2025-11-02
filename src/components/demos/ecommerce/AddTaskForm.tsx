import React from "react";
import { Task } from "./types";

interface AddTaskFormProps {
  newTask: {
    title: string;
    description: string;
    category: Task["category"];
    priority: Task["priority"];
    dueDate: string;
    assignee: string;
    tags: string;
  };
  onTaskChange: (field: string, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  newTask,
  onTaskChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="add-task-form">
      <h4>Create New Task</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => onTaskChange("title", e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={newTask.category}
            onChange={(e) =>
              onTaskChange("category", e.target.value as Task["category"])
            }
          >
            <option value="frontend">🎨 Frontend</option>
            <option value="backend">⚙️ Backend</option>
            <option value="database">💾 Database</option>
            <option value="devops">🚀 DevOps</option>
            <option value="testing">🧪 Testing</option>
          </select>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={newTask.priority}
            onChange={(e) =>
              onTaskChange("priority", e.target.value as Task["priority"])
            }
          >
            <option value="urgent">🔴 Urgent</option>
            <option value="high">🟠 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => onTaskChange("dueDate", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Assign To</label>
          <input
            type="text"
            value={newTask.assignee}
            onChange={(e) => onTaskChange("assignee", e.target.value)}
            placeholder="Team or person name"
          />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={newTask.tags}
            onChange={(e) => onTaskChange("tags", e.target.value)}
            placeholder="React, TypeScript, Redux"
          />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            value={newTask.description}
            onChange={(e) => onTaskChange("description", e.target.value)}
            placeholder="Detailed description..."
            rows={3}
          />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-submit" onClick={onSubmit}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;

