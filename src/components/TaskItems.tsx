import { Reorder, useDragControls } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { useTasks } from "../contexts/TaskProvider";
import type { Task } from "../types";

interface Props {
  task: Task;
  openEditModal: (task: Task) => void;
  draggable?: boolean;
}

const TaskItems = ({ task, openEditModal, draggable = true }: Props) => {
  const { toggleComplete, togglePin, deleteTask } = useTasks();
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={task}
      dragListener={false}
      dragControls={controls}
      className="border border-sky-400 rounded-xl p-4 flex justify-between items-start bg-white"
    >
      {/* Left */}
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mt-1 accent-sky-500 cursor-pointer"
        />

        <div>
          <h3
            className={`font-semibold ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.des}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 text-xl">
        <CiEdit
          onClick={() => openEditModal(task)}
          className="cursor-pointer hover:text-sky-500"
        />

        <TiPin
          onClick={() => togglePin(task.id)}
          className={`cursor-pointer ${task.pinned ? "text-blue-500" : ""}`}
          title="Pin Task"
        />

        <MdDelete
          onClick={() => deleteTask(task.id)}
          className="cursor-pointer text-rose-400 hover:text-red-600"
        />

        {draggable && (
          <button
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab text-gray-400 hover:text-gray-600"
          >
            <MdDragIndicator />
          </button>
        )}
      </div>
    </Reorder.Item>
  );
};

export default TaskItems;
