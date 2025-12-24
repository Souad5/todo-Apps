import { useEffect, useState } from "react";
import type { Task } from "../types";

type Props = {
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, title: string, des: string) => void;
};

const EditTaskModal = ({ task, onClose, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");

  // Sync modal state when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDes(task.des);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(task.id, title, des);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[92%] max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-scaleIn"
      >
        {/*Edit modal Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Task</h2>
          <p className="text-sm text-gray-500">
            Update your task details below
          </p>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Task title"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={des}
            onChange={(e) => setDes(e.target.value)}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Task description"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-sky-500 px-5 py-2 text-sm text-white hover:bg-sky-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
