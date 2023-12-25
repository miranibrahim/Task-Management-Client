import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

// eslint-disable-next-line no-unused-vars
const Task = ({ task, tasks, setTasks, fetchTasks }) => {
  const axiosPublic = useAxiosPublic();
  const handleRemove = async (id) => {
    console.log(id);
    const deleteResult = await axiosPublic.delete(`/tasks/${id}`);
    console.log(deleteResult);
    if (deleteResult.data.deletedCount) {
        toast.error("Task Deleted");
        fetchTasks();
    }
  };
  return (
    <div className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}>
      <Toaster position="top-right" reverseOrder={false} />
      <p>{task.title}</p>
      <button
        className="absolute bottom-1 right-1 text-black"
        onClick={() => {
          handleRemove(task._id);
        }}
      >
        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
};

export default Task;
