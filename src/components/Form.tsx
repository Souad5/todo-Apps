import type { FormEvent } from "react";
import Tasks from "./Tasks";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Home = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("des") as HTMLInputElement).value;
    console.log(name, email);
  };
  return (
    <section className="max-w-4xl mx-auto h-screen pt-5 px-3">
      <div className="flex flex-col items-center">
        <IoIosCheckmarkCircleOutline
          className="border w-20 h-20 p-2 bg-sky-50 rounded-3xl mb-2"
          color="#00a6f4"
        />
        <h1 className="text-5xl font-bold mb-4">
          To<span className="text-sky">Do</span> Apps
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-x-3 w-full p-6 bg-[#ffffff] rounded-xl border 
          border-[#e5e0dc] shadow-xl"
      >
        <div className="flex flex-col md:flex-col justify-center items-center gap-2">
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="">What you will do?</label>
            <input
              type="text"
              name="name"
              placeholder="Work title"
              className="rounded-md p-2 w-full border border-[#e5e0dc] focus:outline-[#00a6f4]"
              required
            />
          </div>

          <div className="flex flex-col w-full space-y-2">
            <label>Describe your work</label>
            <textarea
              name="des"
              className="border border-[#e5e0dc] rounded-md p-2 w-full min-h-32 focus:outline-[#00a6f4]"
              required
              id=""
            ></textarea>
          </div>
        </div>

        <div className="text-center pt-5">
          <input
            type="submit"
            value="+  Submit"
            className="bg-brand bg-sky-500 text-white text-[1em] rounded-lg box-border border border-transparent hover:bg-sky-400 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer w-full"
          />
        </div>
      </form>

      <Tasks />
    </section>
  );
};

export default Home;
