import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdFilterAlt } from "react-icons/md";
import { useFormik } from "formik";
import Button from "./ui/Button";
import TasksSection from "./TasksSection";
import { useTasks } from "../contexts/TaskProvider";
import { toast } from "react-toastify";

const TaskForm = () => {
  const { addTask } = useTasks();
  const notify = () =>
    toast("Submitted done", {
      position: "top-center",
    });

  const postData = useFormik({
    initialValues: {
      title: "",
      des: "",
    },
    onSubmit: (values, { resetForm }) => {
      addTask(values.title, values.des);
      resetForm();
      notify();
    },
  });

  return (
    <section className="max-w-4xl mx-auto pt-5 w-[95%]">
      <div className="flex flex-col items-center">
        <IoIosCheckmarkCircleOutline
          className="border w-20 h-20 p-2 rounded-3xl mb-2"
          color="#00a6f4"
        />
        <h1 className="text-5xl font-bold mb-4">
          To<span className="text-sky">Do</span> Apps
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between my-4 gap-4">
        <form className="relative">
          <input
            type="text"
            className="border border-[#00bcff] rounded-lg p-2 focus:outline-sky-400 w-full"
            placeholder="search"
          />
          <CiSearch className="absolute top-4/12 right-3" />
        </form>

        <form className="relative">
          <input
            type="text"
            className="border border-[#00bcff] p-2 rounded-lg focus:outline-sky-400 w-full"
            placeholder="filter"
          />
          <MdFilterAlt className="absolute top-4/12 right-3" />
        </form>
      </div>

      <form
        onSubmit={postData.handleSubmit}
        className="w-full p-6 rounded-xl border 
          border-[#00bcff] shadow-xl"
      >
        <div className="flex flex-col md:flex-col justify-center items-center gap-2">
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="">What you will do?</label>
            <input
              name="title"
              placeholder="Work title"
              value={postData.values.title}
              className="rounded-md p-2 w-full border border-[#00bcff] focus:outline-[#00a6f4]"
              required
              onChange={postData.handleChange}
            />
          </div>

          <div className="flex flex-col w-full space-y-2">
            <label>Describe your work</label>
            <textarea
              name="des"
              className="border border-[#00bcff] rounded-md p-2 w-full min-h-32 focus:outline-[#00a6f4]"
              required
              value={postData.values.des}
              onChange={postData.handleChange}
            ></textarea>
          </div>
        </div>

        <div className="text-center pt-5">
          <Button></Button>
        </div>
      </form>
      <TasksSection />
    </section>
  );
};

export default TaskForm;
