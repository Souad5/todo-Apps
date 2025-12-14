import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPin } from "react-icons/ti";

const Tasks = () => {
  const [allTask, setAllTask] = useState([]);

  return (
    <section className="mt-5 max-w-4xl mx-auto h-screen">
      {/* tasks count */}
      <div className="flex justify-baseline items-center gap-2">
        <FaTasks /> <h1>TASKS {allTask}</h1>
      </div>

      <div className="flex flex-col justify-center items-center mt-16 gap-2">
        <FaTasks className="text-3xl" />
        <h1 className="text-xl text-gray-500">No Tasks Yet</h1>
        <p className="text-gray-500">Add a task above to get started</p>
      </div>

      <div
        className="bg-[#ffffff] border border-[#e5e0dc] rounded-xl p-4 mt-4 flex justify-between items-center
      "
      >
        <div className="flex gap-3">
          <div>
            <input type="checkbox" />
          </div>
          <div>
            <h1>Title</h1>
            <p>I am going to school.</p>
          </div>
        </div>

        <div className="flex gap-2 text-2xl">
          <CiEdit color="black" className="cursor-pointer" title="edit" />
          <TiPin className="cursor-pointer" title="Pin" />
          <MdDelete
            className="cursor-pointer hover:text-red-600 text-rose-400"
            title="delete"
          />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
