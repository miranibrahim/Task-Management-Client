import { IoIosCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axiosSecure from "../../Hooks/axiosSecure";

// eslint-disable-next-line no-unused-vars
const Task = ({ task, tasks, refetch }) => {


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = async (id) => {
    console.log(id);
    const deleteResult = await axiosSecure.delete(`/tasks/${id}`);
    console.log(deleteResult);
    if (deleteResult.data.deletedCount) {
      toast.error("Task Deleted");
      refetch();
    }
  };
  const rawDate = task.deadline;
  const dateObj = new Date(rawDate);
  const formattedDate = dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const priorityColors = {
    high: '#FF0000',      // Red
    moderate: '#FFA500',  // Orange/Yellow
    low: '#008000',       // Green
    default: '#000000',   // Default color 
  };
  const priorityColor = priorityColors[task.priority] || priorityColors.default;

  const priorityStyle = {
    color: priorityColor,
    textTransform: 'uppercase', // Uppercase style
  };
  return (
    <div>
      <div
        ref={drag}
        className={`relative bg-white p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"
          } border-2`}
        onClick={() => document.getElementById(`my_modal_${task._id}`).showModal()}
      >
        <p className="font-semibold">{task.title}</p>
        <p style={priorityStyle} className=" text-xs">{formattedDate}</p>
        <button
          className="absolute bottom-1 right-1 text-lg"
          onClick={() => {
            handleRemove(task._id);
          }}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>
      <dialog id={`my_modal_${task._id}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">{task.title}</h3>
          <p className="py-4 text-center">{task.description}</p>
          <div className="flex justify-between">
            <p >Priority: <span style={priorityStyle} className="uppercase"> {task.priority} </span></p>
            <p>{formattedDate}</p>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <Link to={`/updateTask/${task._id}`} state={task}>
                <button className="btn">Update</button>
              </Link>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Task;
