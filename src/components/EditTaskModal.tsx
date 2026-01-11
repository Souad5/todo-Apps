import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import type { Props } from "../types";

const EditTaskModal = ({ task, onClose, onSave }: Props) => {
  const notify = () =>
    toast.success("Task updated successfully", {
      position: "top-center",
    });

  const postData = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: task?.title || "",
      des: task?.des || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      des: Yup.string()
        .required("Description is required")
        .min(5, "Description must be at least 5 characters"),
    }),
    onSubmit: (values) => {
      if (!task) return;
      onSave(task.id, values.title, values.des);
      notify();
      onClose();
    },
  });

  if (!task) return null;

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
        {/* Header */}
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
            name="title"
            autoFocus
            value={postData.values.title}
            onChange={postData.handleChange}
            onBlur={postData.handleBlur}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Task title"
          />
          {postData.touched.title && postData.errors.title && (
            <p className="text-xs text-red-500 mt-1">{postData.errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="des"
            value={postData.values.des}
            onChange={postData.handleChange}
            onBlur={postData.handleBlur}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Task description"
          />
          {postData.touched.des && postData.errors.des && (
            <p className="text-xs text-red-500 mt-1">{postData.errors.des}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => postData.handleSubmit()}
            className="rounded-lg bg-sky-500 px-5 py-2 text-sm text-white hover:bg-sky-600 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
