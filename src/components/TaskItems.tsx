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
      <div className="flex items-baseline gap-2">
        <div className="">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className=" accent-sky-500 cursor-pointer h-6 w-6"
          />
        </div>

        <div>
          <h3
            className={`font-semibold text-2xl ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-lg text-gray-600">{task.des}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 text-xl">
        <CiEdit
          onClick={() => openEditModal(task)}
          className="cursor-pointer text-2xl hover:text-sky-500"
          title="edit"
        />

        <TiPin
          onClick={() => togglePin(task.id)}
          className={`cursor-pointer text-2xl ${
            task.pinned ? "text-blue-500" : ""
          } hover:text-blue-500`}
          title="Pin Task"
        />

        <MdDelete
          onClick={() => deleteTask(task.id)}
          className="cursor-pointer text-2xl text-rose-500 hover:text-red-600"
          title="delete"
        />

        {draggable && (
          <button
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab text-2xl text-gray-300 hover:text-gray-600"
            title="drag"
          >
            <MdDragIndicator />
          </button>
        )}
      </div>
    </Reorder.Item>
  );
};

export default TaskItems;
