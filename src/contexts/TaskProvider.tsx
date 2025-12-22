import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types";
import { toast } from "react-toastify";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, des: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  togglePin: (id: string) => void;
  editTask: (id: string, title: string, des: string) => void;
};
const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, des: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        des,
        completed: false,
        pinned: false,
      },
    ]);
  };

  const notify = () =>
    toast.warning("Task deleted!!", {
      position: "top-center",
    });

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    notify();
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const togglePin = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  const editTask = (id: string, title: string, des: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title, des } : task))
    );
  };
  console.log(tasks);

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        addTask,
        deleteTask,
        toggleComplete,
        togglePin,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
