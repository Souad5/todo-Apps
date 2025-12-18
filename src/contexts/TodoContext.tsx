import { Children, createContext } from "react";

export type Task = {
  id: number;
  title: string;
  des: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, des: string) => void;
};
export const PostContext = createContext<TaskContextType | null>(null);

export const TodoContext = () => {
  return (
    <div>
      <PostContext.Provider value={}>{Children}</PostContext.Provider>
    </div>
  );
};
