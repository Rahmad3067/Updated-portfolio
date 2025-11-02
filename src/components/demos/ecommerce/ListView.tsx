import React from "react";
import { Task } from "./types";
import ListItem from "./ListItem";

interface ListViewProps {
  tasks: Task[];
  selectedTask: string | null;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDelete: (taskId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({
  tasks,
  selectedTask,
  onTaskClick,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div className="list-view">
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          task={task}
          selectedTask={selectedTask}
          onTaskClick={onTaskClick}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ListView;

