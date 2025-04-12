import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosSecure from "../../Hooks/axiosSecure";

// eslint-disable-next-line no-unused-vars
const CreateTask = ({ refetch }) => {
  const user = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const task = {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      status: "todo",
      userEmail: user.user.email,
    };
    const taskResult = await axiosSecure.post("/tasks", task);
    console.log(taskResult);

    if (taskResult.data.insertedId) {
      toast.success("Task Added Successfully");
      refetch();
      reset();
    }
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="w-3/4 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Title:</label>
            <input
              type="text"
              placeholder="Task Name"
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Description:
            </label>
            <input
              type="text"
              placeholder="Details"
              {...register("description", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Deadline:
            </label>
            <input
              type="datetime-local"
              {...register("deadline", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Priority:
            </label>
            <select
              {...register("priority", { required: true })}
              className="input input-bordered w-full"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="btn bg-lime-500 w-full md:w-auto text-black"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

CreateTask.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default CreateTask;
