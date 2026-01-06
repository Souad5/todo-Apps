import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Reorder } from "framer-motion";
import type { Task, TasksSectionProps } from "../types";
import EditTaskModal from "./EditTaskModal";
import Pagination from "./Pagination";
import { useTasks } from "../contexts/TaskProvider";
import TaskItems from "./TaskItems";
import { TaskCard } from "./TaskCard";
import { TASKS_PER_PAGE } from "../constants/settings";

const TasksSection = ({ searchQuery, filterStatus }: TasksSectionProps) => {
  const { tasks, editTask, reorderTasks } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  //  Filter
  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(q) ||
      task.des.toLowerCase().includes(q);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);

    return matchesSearch && matchesStatus;
  });

  //  Separate pinned
  const pinnedTasks = filteredTasks.filter((t) => t.pinned);
  const unpinnedTasks = filteredTasks.filter((t) => !t.pinned);

  //  Pagination
  const totalPages = Math.ceil(unpinnedTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const currentTasks = unpinnedTasks.slice(
    startIndex,
    startIndex + TASKS_PER_PAGE
  );

  useEffect(() => {
    // eslint-disable-next-line
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center mt-16 text-gray-500">
        <FaTasks className="text-3xl mb-2" />
        <p className="text-lg font-medium">No Tasks Yet</p>
        <p className="text-sm">Add a task to get started</p>
      </div>
    );
  }

  return (
    <section className="my-10 space-y-6">
      {/*  Pinned Tasks */}
      {pinnedTasks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center">Pinned Tasks</h2>
          {pinnedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              // openEditModal={setSelectedTask}
              // draggable={false}
            />
          ))}
        </>
      )}

      {/*  All Tasks */}
      <h2 className="text-2xl font-bold text-center">All Tasks</h2>

      <Reorder.Group
        axis="y"
        values={currentTasks}
        onReorder={(newOrder) => {
          const updated = [...unpinnedTasks];
          updated.splice(startIndex, newOrder.length, ...newOrder);
          reorderTasks(updated);
        }}
        className="space-y-4"
      >
        {currentTasks.map((task) => (
          <TaskItems
            key={task.id}
            task={task}
            openEditModal={setSelectedTask}
            draggable
          />
        ))}
      </Reorder.Group>

      {/*  Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/*  Edit Modal */}
      <EditTaskModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSave={(id, title, des) => editTask(id, title, des)}
      />
    </section>
  );
};

export default TasksSection;
