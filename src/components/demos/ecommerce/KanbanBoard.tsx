import React from "react";
import { Task } from "./types";
import KanbanCard from "./KanbanCard";
import { getStatusLabel } from "./utils";

interface KanbanBoardProps {
  tasks: Task[];
  stats: any;
  selectedTask: string | null;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  stats,
  selectedTask,
  onTaskClick,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div className="kanban-board">
      {["todo", "in-progress", "in-review", "done"].map((status) => (
        <div key={status} className="kanban-column">
          <div className="column-header">
            <h4>{getStatusLabel(status)}</h4>
            <span className="column-count">{stats.byStatus[status] || 0}</span>
          </div>
          <div className="column-content">
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  selectedTask={selectedTask}
                  onTaskClick={onTaskClick}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

