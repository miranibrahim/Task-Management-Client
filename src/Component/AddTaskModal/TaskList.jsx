import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Partition from "./Partition";

const TaskList = ({ tasks, refetch }) => {
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const getTodo = tasks.filter((task) => task.status === "todo");
    setTodo(getTodo);

    const getOngoing = tasks.filter((task) => task.status === "ongoing");
    setOngoing(getOngoing);

    const getCompleted = tasks.filter((task) => task.status === "completed");
    setCompleted(getCompleted);
  }, [tasks]);
  const statuses = ["todo", "ongoing", "completed"];
  console.log("from tl", tasks);
  return (
    <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {statuses.map((status, index) => (
        <Partition
          key={index}
          status={status}
          tasks={tasks}
          refetch={refetch}
          todo={todo}
          ongoing={ongoing}
          completed={completed}
        ></Partition>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TaskList;
