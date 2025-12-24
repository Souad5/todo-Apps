import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

  const id = uuidv4();

  const addTask = (title: string, des: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id,
        title,
        des,
        completed: false,
        pinned: false,
      },
    ]);
  };

  const deleteNotify = () =>
    toast.warning("Task deleted!!", {
      position: "top-center",
    });

  const deleteTask = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
        deleteNotify();
      }
    });
  };

  const completeNotify = () =>
    toast.success("Task completed", {
      position: "top-center",
    });

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    completeNotify();
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
