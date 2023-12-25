import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const Task = ({ task, tasks, setTasks }) => {
    const axiosPublic = useAxiosPublic();
  const handleRemove = async (id) => {
    console.log(id);
    // const deleteResult = await axiosPublic.delete(`/tasks/${id}`);

  };
  return (
    <div className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}>
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
};

export default Task;
