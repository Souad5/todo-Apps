import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "./ui/Button";
import { useTasks } from "../useTasks";
import TasksSection from "./TasksSection";

type FilterStatus = "all" | "pending" | "completed";

const TaskForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const { addTask } = useTasks();

  const notify = () =>
    toast("Task submitted successfully", { position: "top-center" });

  // Formik with Yup validation
  const postData = useFormik({
    initialValues: {
      title: "",
      des: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      des: Yup.string()
        .required("Description is required")
        .min(5, "Description must be at least 5 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      addTask(values.title, values.des);
      resetForm();
      notify();
    },
  });

  return (
    <section className="max-w-4xl mx-auto pt-5 w-[95%]">
      {/* Header */}
      <div className="flex flex-col items-center">
        <IoIosCheckmarkCircleOutline
          className="border w-20 h-20 p-2 rounded-3xl mb-2"
          color="#00a6f4"
        />
        <h1 className="text-5xl font-bold mb-4">ToDo Apps</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between my-4 gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            className="border border-[#00bcff] rounded-lg p-2 focus:outline-sky-400 w-full"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className="absolute top-1/2 transform -translate-y-1/2 right-3" />
        </div>

        {/* Status Filter */}
        <div className="relative w-full md:w-1/2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className="border border-[#00bcff] p-2 rounded-lg w-full focus:outline-sky-400"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={postData.handleSubmit}
        className="w-full p-6 rounded-xl border border-[#00bcff] shadow-xl"
      >
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="font-semibold">
              Task Title
            </label>
            <input
              name="title"
              placeholder="Work title"
              value={postData.values.title}
              onChange={postData.handleChange}
              className={`rounded-md p-2 w-full border focus:outline-[#00a6f4] ${
                postData.touched.title && postData.errors.title
                  ? "border-red-500"
                  : "border-[#00bcff]"
              }`}
            />
            {postData.touched.title && postData.errors.title && (
              <p className="text-red-500 text-sm">{postData.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col w-full">
            <label htmlFor="des" className="font-semibold">
              Task Description
            </label>
            <textarea
              name="des"
              placeholder="Describe your work"
              value={postData.values.des}
              onChange={postData.handleChange}
              className={`rounded-md p-2 w-full min-h-32 border focus:outline-[#00a6f4] ${
                postData.touched.des && postData.errors.des
                  ? "border-red-500"
                  : "border-[#00bcff]"
              }`}
            />
            {postData.touched.des && postData.errors.des && (
              <p className="text-red-500 text-sm">{postData.errors.des}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <Button type="submit">Add Task</Button>
          </div>
        </div>
      </form>

      {/* Task List Section */}
      <TasksSection searchQuery={searchQuery} filterStatus={filterStatus} />
    </section>
  );
};

export default TaskForm;
