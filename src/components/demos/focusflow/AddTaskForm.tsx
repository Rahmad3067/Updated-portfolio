import React, { useState } from "react";
import { Task } from "./types";

interface AddTaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Task["category"]>("work");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [duration, setDuration] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      category,
      priority,
      duration,
      status: "pending",
    });

    // Reset form
    setTitle("");
    setCategory("work");
    setPriority("medium");
    setDuration(30);
  };

  return (
    <div className="add-task-form">
      <h4>➕ Add New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Task["category"])
              }
            >
              <option value="work">💼 Work</option>
              <option value="personal">👤 Personal</option>
              <option value="health">🏃 Health</option>
              <option value="learning">📚 Learning</option>
              <option value="other">📋 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Task["priority"])
              }
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              min="5"
              max="480"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

