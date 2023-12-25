import PropTypes from "prop-types";
import Header from "./Header";
import Task from "./Task";

const Partition = ({ status, tasks, setTasks, todo, ongoing, completed }) => {
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
    <div className="">
      <Header text={text} bg={bg} count={tasksToMap.length} />

      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

Partition.propTypes = {
    status: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired, 
    setTasks: PropTypes.func.isRequired, 
    todo: PropTypes.array.isRequired,
    ongoing: PropTypes.array.isRequired,
    completed: PropTypes.array.isRequired,
  };
  
export default Partition;
