import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { FaTasks } from "react-icons/fa";
import { useTasks } from "../contexts/TaskProvider";
import type { Task } from "../types";
import EditTaskModal from "./ui/EditTaskModal";

const TasksSection = () => {
  const { tasks, deleteTask, toggleComplete, togglePin, editTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // open Modal
  const openEditModal = (task: Task) => {
    setSelectedTask(task);
  };
  // closeModal
  const closeEditModal = () => {
    setSelectedTask(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center mt-16 text-gray-500">
        <FaTasks className="text-3xl mb-2" />
        <p className="text-lg font-medium">No Tasks Yet</p>
        <p className="text-sm">Add a task above to get started</p>
      </div>
    );
  }

  return (
    <section className="my-10 space-y-3">
      <h1 className="text-3xl font-bold text-center">Pinned Task</h1>
      {tasks.length === 0 ? "<p>No pin task</p>" : `None`}
      <h1 className="text-center text-3xl font-bold">All Task</h1>
      <h1>Task: {tasks.length}</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
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

          {/* Right actions */}
          <div className="flex items-center gap-3 text-xl">
            <CiEdit
              className="cursor-pointer hover:text-sky-500"
              title="Edit"
              onClick={() => openEditModal(task)}
            />

            <TiPin
              className={`cursor-pointer ${
                task.pinned ? "text-yellow-500" : "hover:text-yellow-500"
              }`}
              title="Pin"
              onClick={() => togglePin(task.id)}
            />

            <MdDelete
              className="cursor-pointer text-rose-400 hover:text-red-600"
              title="Delete"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <EditTaskModal
        task={selectedTask}
        onClose={closeEditModal}
        onSave={(id, title, des) => editTask(id, title, des)}
      />
    </section>
  );
};

export default TasksSection;
