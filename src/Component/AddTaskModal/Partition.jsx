import PropTypes from "prop-types";
import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import axiosSecure from "../../Hooks/axiosSecure";

const Partition = ({ status, tasks, todo, ongoing, completed, refetch }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = async (id) => {
    console.log("dropped id", id, status);
    const taskStatus = {
      id,
      status,
    };
    const changeResult = await axiosSecure.patch(`/tasks/${id}`, taskStatus);

    console.log(changeResult);
    if (changeResult.data.modifiedCount) {
      refetch();
    }
  };

  let text = "TODO";
  let bg = "bg-slate-500";
  let tasksToMap = todo;

  if (status === "ongoing") {
    text = "ONGOING";
    bg = "bg-purple-500";
    tasksToMap = ongoing;
  }

  if (status === "completed") {
    text = "COMPLETED";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  return (
    <div
      ref={drop}
      className={`rounded-md p-1 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />

      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task._id}
            task={task}
            tasks={tasks}
            refetch={refetch}
          />
        ))}
    </div>
  );
};

Partition.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
  todo: PropTypes.array.isRequired,
  ongoing: PropTypes.array.isRequired,
  completed: PropTypes.array.isRequired,
};

export default Partition;
