import { useState } from "react";
import { FaTasks } from "react-icons/fa";

const Tasks = () => {
  const [allTask, setAllTask] = useState(0);
  console.log(setAllTask)
  return (
    <section className="mt-5">
        
        {/* tasks count */}

      <div className="flex justify-baseline items-center gap-2">
        <FaTasks /> <h1>TASKS {allTask}</h1>
      </div>

      <div className="flex flex-col justify-center items-center mt-16 gap-2">
        <FaTasks className="text-3xl " />
        <h1 className="text-xl text-gray-500">No Tasks Yet</h1>
        <p className="text-gray-500">Add a task above to get started</p>
      </div>
    </section>
  );
};

export default Tasks;

