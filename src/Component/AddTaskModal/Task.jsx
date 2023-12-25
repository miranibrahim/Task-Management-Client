import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

// eslint-disable-next-line no-unused-vars
const Task = ({ task, tasks, setTasks, fetchTasks }) => {
  const axiosPublic = useAxiosPublic();

  
  const [{isDragging}, drag] = useDrag(() => ({
    type: "task",
    item: {id: task._id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  
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
    <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging? 'opacity-25': 'opacity-100'} font-semibold`}>
      
      <p>{task.title}</p>
      <button
        className="absolute bottom-1 right-1 text-lg"
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
