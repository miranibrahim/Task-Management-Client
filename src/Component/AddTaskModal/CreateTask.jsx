import { useContext } from "react";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const CreateTask = () => {
  const user = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const taskName = form.task.value;
    console.log(taskName);
    if(taskName.length<3)
    return toast.error("At least 3 character needed.");

    const task = {
      taskName: taskName,
      status: "todo",
      userEmail: user.user.email,
    };

    try {
      const taskResult = await axiosPublic.post("/tasks", task);
      console.log(taskResult);

      if (taskResult.data.insertedId) {
        toast.success("Task Added Successfully");
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="join">
        <input
          className="input input-bordered join-item"
          type="text"
          name="task"
          id="task"
          placeholder="Write Task"
        />
        <button className="btn join-item rounded-r-full" type="submit">
          CreateTask
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
