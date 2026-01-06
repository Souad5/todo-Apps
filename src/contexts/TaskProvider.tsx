import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
// import { TaskContext } from "../types";
import type { Task } from "../types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, des: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  togglePin: (id: string) => void;
  editTask: (id: string, title: string, des: string) => void;
  reorderTasks: (tasks: Task[]) => void;
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
        id: uuidv4(),
        title,
        des,
        completed: false,
        pinned: false,
      },
    ]);
  };

  const deleteTask = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast.warning("Task deleted!!", { position: "top-center" });
      }
    });
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

  // Reorder ONLY unpinned tasks
  const reorderTasks = (newUnpinnedOrder: Task[]) => {
    setTasks((prev) => {
      const pinned = prev.filter((t) => t.pinned);
      return [...pinned, ...newUnpinnedOrder];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
        togglePin,
        editTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

//eslint-disable-next-line
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};
