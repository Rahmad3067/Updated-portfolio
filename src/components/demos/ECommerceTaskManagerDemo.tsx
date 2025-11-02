import React, { useState, useEffect } from "react";
import "./ECommerceTaskManagerDemo.css";
import AddTaskForm from "./ecommerce/AddTaskForm";
import KanbanBoard from "./ecommerce/KanbanBoard";
import ListView from "./ecommerce/ListView";
import { sampleTasks } from "./ecommerce/sampleData";
import StatisticsDashboard from "./ecommerce/StatisticsDashboard";
import { initialState, tasksReducer } from "./ecommerce/reduxSimulation";
import { Task } from "./ecommerce/types";
import { calculateStats } from "./ecommerce/utils";

const ECommerceTaskManagerDemo: React.FC = () => {
  // Simulate Redux store
  const [state, dispatch] = React.useReducer(tasksReducer, initialState);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddTask, setShowAddTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "frontend" as Task["category"],
    priority: "medium" as Task["priority"],
    dueDate: "",
    assignee: "",
    tags: "",
  });

  // Initialize with sample data
  useEffect(() => {
    dispatch({ type: "tasks/setTasks", payload: sampleTasks });
  }, []);

  // Filter tasks based on current filters
  const filterTasks = (tasks: Task[]): Task[] => {
    return tasks.filter((task) => {
      const matchesCategory =
        filterCategory === "all" || task.category === filterCategory;
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesPriority && matchesSearch;
    });
  };

  // Add new task
  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      status: "todo",
      dueDate: newTask.dueDate,
      assignee: newTask.assignee || "Unassigned",
      tags: newTask.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "tasks/addTask", payload: task });
    setNewTask({
      title: "",
      description: "",
      category: "frontend",
      priority: "medium",
      dueDate: "",
      assignee: "",
      tags: "",
    });
    setShowAddTask(false);
  };

  // Update task status (simulating drag-and-drop)
  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    const task = state.tasks.find((t: Task) => t.id === taskId);
    if (task) {
      dispatch({
        type: "tasks/updateTask",
        payload: { ...task, status: newStatus },
      });
    }
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "tasks/deleteTask", payload: taskId });
    if (selectedTask === taskId) {
      setSelectedTask(null);
    }
  };

  const stats = calculateStats(state.tasks);
  const filteredTasks = filterTasks(state.tasks);

  const handleTaskChange = (field: string, value: any) => {
    setNewTask({ ...newTask, [field]: value });
  };

  return (
    <div className="ecommerce-task-demo">
      <div className="demo-header">
        <div>
          <h3>E-Commerce Task Manager</h3>
          <p>
            Full-stack project management system with Redux Toolkit for state
            management
          </p>
        </div>
        <div className="header-badge">
          <span className="badge redux-badge">Redux Toolkit</span>
          <span className="badge fullstack-badge">Full-Stack</span>
        </div>
      </div>

      <StatisticsDashboard stats={stats} />

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="frontend">🎨 Frontend</option>
            <option value="backend">⚙️ Backend</option>
            <option value="database">💾 Database</option>
            <option value="devops">🚀 DevOps</option>
            <option value="testing">🧪 Testing</option>
          </select>
          <select
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">🔴 Urgent</option>
            <option value="high">🟠 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button
            className="view-toggle"
            onClick={() =>
              setViewMode(viewMode === "kanban" ? "list" : "kanban")
            }
          >
            {viewMode === "kanban" ? "📋 List View" : "📊 Kanban View"}
          </button>
          <button
            className="add-task-btn"
            onClick={() => setShowAddTask(!showAddTask)}
          >
            + Add Task
          </button>
        </div>
      </div>

      {showAddTask && (
        <AddTaskForm
          newTask={newTask}
          onTaskChange={handleTaskChange}
          onSubmit={handleAddTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}

      {viewMode === "kanban" ? (
        <KanbanBoard
          tasks={filteredTasks}
          stats={stats}
          selectedTask={selectedTask}
          onTaskClick={setSelectedTask}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      ) : (
        <ListView
          tasks={filteredTasks}
          selectedTask={selectedTask}
          onTaskClick={setSelectedTask}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default ECommerceTaskManagerDemo;
