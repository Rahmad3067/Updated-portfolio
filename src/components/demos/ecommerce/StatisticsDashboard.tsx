import React from "react";
import { Stats } from "./types";

interface StatisticsDashboardProps {
  stats: Stats;
}

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚡</div>
        <div className="stat-content">
          <div className="stat-value" style={{ color: "#dc2626" }}>
            {stats.byPriority.urgent || 0}
          </div>
          <div className="stat-label">Urgent</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🔴</div>
        <div className="stat-content">
          <div className="stat-value" style={{ color: "#ea580c" }}>
            {stats.byPriority.high || 0}
          </div>
          <div className="stat-label">High Priority</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚠️</div>
        <div className="stat-content">
          <div className="stat-value" style={{ color: "#f59e0b" }}>
            {stats.overdue}
          </div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <div className="stat-value" style={{ color: "#10b981" }}>
            {stats.byStatus.done || 0}
          </div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🔄</div>
        <div className="stat-content">
          <div className="stat-value" style={{ color: "#3b82f6" }}>
            {stats.byStatus["in-progress"] || 0}
          </div>
          <div className="stat-label">In Progress</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;

