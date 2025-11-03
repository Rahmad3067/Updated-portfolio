import React from "react";
import { ProductivityStats } from "./types";
import { getCategoryColor, getPriorityColor } from "./utils";

interface DashboardProps {
  stats: ProductivityStats;
  focusTimeToday: number;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, focusTimeToday }) => {
  return (
    <div className="focusflow-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div
              className="stat-value"
              style={{ color: "#10b981" }}
            >
              {stats.completedTasks}
            </div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div
              className="stat-value"
              style={{
                color:
                  stats.productivity > 70
                    ? "#10b981"
                    : stats.productivity > 40
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            >
              {stats.productivity}%
            </div>
            <div className="stat-label">Productivity</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value" style={{ color: "#3b82f6" }}>
              {Math.floor(focusTimeToday / 60)}h {focusTimeToday % 60}m
            </div>
            <div className="stat-label">Focus Time</div>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h4>Tasks by Category</h4>
          <div className="category-bars">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="category-bar">
                <div className="bar-label">
                  <span
                    className="category-dot"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  ></span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / stats.totalTasks) * 100}%`,
                      color: getCategoryColor(category),
                    }}
                  >
                    <span className="bar-value">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-box">
          <h4>Tasks by Priority</h4>
          <div className="priority-bars">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="priority-bar">
                <div className="bar-label">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / stats.totalTasks) * 100}%`,
                      color: getPriorityColor(priority),
                    }}
                  >
                    <span className="bar-value">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

