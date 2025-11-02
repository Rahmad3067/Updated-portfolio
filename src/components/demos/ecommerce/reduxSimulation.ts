import { Task } from "./types";

// Simulate Redux Toolkit actions and state
export const initialState = {
  tasks: [] as Task[],
  loading: false,
  error: null as string | null,
};

// Simulate Redux Toolkit reducers
export const tasksReducer = (state: any, action: any) => {
  switch (action.type) {
    case "tasks/addTask":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "tasks/updateTask":
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task.id === action.payload.id
            ? { ...action.payload, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    case "tasks/deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter((task: Task) => task.id !== action.payload),
      };
    case "tasks/setTasks":
      return { ...state, tasks: action.payload };
    case "tasks/setLoading":
      return { ...state, loading: action.payload };
    case "tasks/setError":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

