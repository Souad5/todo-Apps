import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPin, TiTick } from "react-icons/ti";

const Tasks = (props: { name: string }) => {
  const [allTask, setAllTask] = useState(0);
  return (
    <section className="mt-5 max-w-4xl mx-auto px-4 h-screen">
      {/* tasks count */}
      <div className="flex justify-baseline items-center gap-2">
        <FaTasks /> <h1>TASKS {allTask}</h1>
      </div>

      <div className="flex flex-col justify-center items-center mt-16 gap-2">
        <FaTasks className="text-3xl " />
        <h1 className="text-xl text-gray-500">No Tasks Yet</h1>
        <p className="text-gray-500">Add a task above to get started</p>
      </div>

      <div
        className="bg-[#ffffff] border border-[#e5e0dc] rounded-xl p-4 mt-4 flex justify-between items-center
      "
      >
        <div>
          <h1>{props.name}</h1>
          <p>I am going to school after 4.00 pm.</p>
        </div>
        <div className="flex gap-2 text-2xl">
          <CiEdit color="black" className="cursor-pointer" title="edit" />
          <MdDelete color="red" className="cursor-pointer" title="delete" />
          <TiTick color="green" className="cursor-pointer" title="OK" />
          <TiPin color="blue" className="cursor-pointer" title="Pin" />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
