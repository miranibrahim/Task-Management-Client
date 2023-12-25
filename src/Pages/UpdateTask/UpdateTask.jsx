import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { useParams } from "react-router-dom";

const UpdateTask = ({ tasks, refetch }) => {
  const user = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  console.log(id);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosPublic.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [axiosPublic, id]);

  useEffect(() => {
    
    console.log(task);
  }, [task]);

  return (
    <div className="w-full mx-auto pt-20">
      {/* <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ">
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn bg-lime-500 w-full md:w-auto text-black"
          >
            Update Task
          </button>
        </div>
      </form> */}
    </div>
  );
};

UpdateTask.propTypes = {
  tasks: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdateTask;
