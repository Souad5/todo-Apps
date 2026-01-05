import { Reorder, useDragControls } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { useTasks } from "../contexts/TaskProvider";

// interface Task {
//   id: string;
//   title: string;
//   des: string;
//   completed: boolean;
//   pinned: boolean;
// }

// interface TaskItemsProps {
//   task: Task;
//   openEditModal: (task: Task) => void;
// }

interface Task {
  id: string;
  title: string;
  des: string;
  completed: boolean;
  pinned: boolean;
}

interface TaskProps {
  task: Task;
  openEditModal: (task: Task) => void;
}

const TaskItems = ({ task, openEditModal }: TaskProps) => {
  const { toggleComplete, togglePin, deleteTask } = useTasks();

  const controls = useDragControls();
  return (
    <Reorder.Item
      id={task.id}
      key={task.id}
      value={task}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border border-sky-400 rounded-xl p-4 flex justify-between items-start"
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
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-sm ${
              task.completed ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {task.des}
          </p>
        </div>
      </div>

      {/* Actions buttons*/}
      <div className="flex items-center gap-3 text-xl">
        <CiEdit
          className="cursor-pointer hover:text-sky-500"
          onClick={() => openEditModal(task)}
          title="edit"
        />

        <TiPin
          className={`cursor-pointer ${
            task.pinned ? "text-blue-500" : "hover:text-gray-500"
          }`}
          onClick={() => togglePin(task.id)}
          title="Pin task"
        />

        <MdDelete
          className="cursor-pointer text-rose-400 hover:text-red-600"
          onClick={() => deleteTask(task.id)}
          title="delete"
        />

        {/* DRAG HANDLE */}
        <button
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab text-gray-400 hover:text-gray-600 reorder-handle"
          title="Drag"
        >
          <MdDragIndicator />
        </button>
      </div>
    </Reorder.Item>
  );
};

export default TaskItems;
