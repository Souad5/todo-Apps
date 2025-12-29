import { motion } from "framer-motion";
import { TiPin } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import type { Task } from "../types";
import { useTasks } from "../useTasks";
export const TaskCard = ({ task }: { task: Task }) => {
  const { deleteTask, toggleComplete, togglePin } = useTasks();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-[#00bcff] rounded-xl p-4 flex justify-between items-start"
    >
      {/* Left */}
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mt-1 cursor-pointer accent-sky-500"
        />

        <div>
          <h3
            className={`font-semibold ${
              task.completed && "line-through text-gray-400"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.des}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-3 text-xl">
        <TiPin
          className={`cursor-pointer ${task.pinned && "text-blue-500"}`}
          onClick={() => togglePin(task.id)}
        />
        <MdDelete
          className="cursor-pointer text-rose-400"
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </motion.div>
  );
};
