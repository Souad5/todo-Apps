import { useContext } from "react";
import { TaskContext } from "./contexts/TaskProvider";

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
