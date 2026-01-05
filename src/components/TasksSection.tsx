import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import type { Task, TasksSectionProps } from "../types";
import EditTaskModal from "./EditTaskModal";
import { TaskCard } from "./TaskCard";
import Pagination from "./Pagination";
import { useTasks } from "../contexts/TaskProvider";
import TaskItems from "./TaskItems";

const TASKS_PER_PAGE = 5;

const TasksSection = ({ searchQuery, filterStatus }: TasksSectionProps) => {
  const { tasks, editTask } = useTasks();

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
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  // useEffect(() => {
  //   setReorder(currentTasks);
  // }, [currentTasks]);

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
        {reorder.map((task) => (
          <TaskItems key={task.id} task={task} openEditModal={openEditModal} />
        ))}
      </Reorder.Group>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Edit Modal */}
      <AnimatePresence>
        <motion.div>
          <EditTaskModal
            task={selectedTask}
            onClose={closeEditModal}
            onSave={(id, title, des) => editTask(id, title, des)}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default TasksSection;
