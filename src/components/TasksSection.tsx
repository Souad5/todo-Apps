import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { FaTasks } from "react-icons/fa";
import { Reorder, useDragControls } from "framer-motion";
import type { Task, TasksSectionProps } from "../types";
import EditTaskModal from "./EditTaskModal";
import { TaskCard } from "./TaskCard";
import Pagination from "./Pagination";
import { useTasks } from "../contexts/TaskProvider";

const TASKS_PER_PAGE = 5;

const TasksSection = ({ searchQuery, filterStatus }: TasksSectionProps) => {
  const { tasks, deleteTask, toggleComplete, togglePin, editTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (task.title ?? "").toLowerCase().includes(query) ||
      (task.des ?? "").toLowerCase().includes(query);

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "pending" && !task.completed) ||
      (filterStatus === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  const pinnedTasks = filteredTasks.filter((task) => task.pinned);
  const unpinnedTasks = filteredTasks.filter((task) => !task.pinned);

  const totalPages = Math.ceil(unpinnedTasks.length / TASKS_PER_PAGE);

  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const currentTasks = unpinnedTasks.slice(
    startIndex,
    startIndex + TASKS_PER_PAGE
  );
  const openEditModal = (task: Task) => setSelectedTask(task);
  const closeEditModal = () => setSelectedTask(null);
  const [reorder, setReorder] = useState(currentTasks);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center mt-16 text-gray-500">
        <FaTasks className="text-3xl mb-2" />
        <p className="text-lg font-medium">No Tasks Yet</p>
        <p className="text-sm">Add a task above to get started</p>
      </div>
    );
  }

  const controls = useDragControls();

  return (
    <section className="my-10 space-y-4">
      {/* Pinned */}
      {pinnedTasks.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-center">Pinned Tasks</h1>
          {pinnedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </>
      )}

      {/* All Tasks */}
      <h1 className="text-center text-3xl font-bold">All Tasks</h1>
      <Reorder.Group
        axis="y"
        values={reorder}
        onReorder={setReorder}
        className="space-y-4"
      >
        {currentTasks.map((task) => (
          <Reorder.Item
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
        ))}
      </Reorder.Group>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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
