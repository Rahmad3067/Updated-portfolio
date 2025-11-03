import React, { useState } from "react";
import "./FocusFlowDemo.css";
import AISuggestionsPanel from "./focusflow/AISuggestionsPanel";
import AddTaskForm from "./focusflow/AddTaskForm";
import Dashboard from "./focusflow/Dashboard";
import DailyPlanPanel from "./focusflow/DailyPlanPanel";
import SummaryPanel from "./focusflow/SummaryPanel";
import TaskList from "./focusflow/TaskList";
import {
  generateAISuggestions,
  generateDailyPlan,
  generateSmartSummary,
} from "./focusflow/aiSimulator";
import { sampleLogs, sampleTasks } from "./focusflow/sampleData";
import { Task } from "./focusflow/types";
import { calculateStats } from "./focusflow/utils";

const FocusFlowDemo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [dailyLogs] = useState(sampleLogs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dailyPlan, setDailyPlan] = useState("");
  const [summary, setSummary] = useState("");

  const stats = calculateStats(tasks, dailyLogs);
  const focusTimeToday = tasks
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.duration, 0);

  const suggestions = generateAISuggestions(tasks, dailyLogs);

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
            completedAt:
              newStatus === "completed"
                ? new Date().toISOString()
                : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddForm(false);
  };

  const handleGeneratePlan = () => {
    const plan = generateDailyPlan(tasks, 8);
    setDailyPlan(plan);
  };

  const handleGenerateSummary = () => {
    const summary = generateSmartSummary(dailyLogs);
    setSummary(summary);
  };

  return (
    <div className="focusflow-demo">
      <div className="demo-header">
        <div>
          <h3>FocusFlow - AI Productivity App</h3>
          <p>
            AI-powered daily planner with smart suggestions, productivity tracking, and focus time management
          </p>
        </div>
        <div className="header-badge">
          <span className="badge ai-badge">OpenAI API</span>
          <span className="badge fullstack-badge">Full-Stack</span>
        </div>
      </div>

      <Dashboard stats={stats} focusTimeToday={focusTimeToday} />

      <div className="main-content">
        <div className="left-column">
          <div className="tasks-section">
            <div className="section-header">
              <h4>📋 Your Tasks</h4>
              <button
                className="btn-add-task"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? "✕ Cancel" : "+ Add Task"}
              </button>
            </div>

            {showAddForm && (
              <AddTaskForm
                onSubmit={handleAddTask}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
          </div>
        </div>

        <div className="right-column">
          <AISuggestionsPanel suggestions={suggestions} />

          <DailyPlanPanel
            plan={dailyPlan}
            onGenerate={handleGeneratePlan}
          />

          <SummaryPanel
            summary={summary}
            onGenerate={handleGenerateSummary}
          />
        </div>
      </div>
    </div>
  );
};

export default FocusFlowDemo;

