import { useState } from "react";
import CreateTask from "../../Component/AddTaskModal/CreateTask";
import TaskList from "../../Component/AddTaskModal/TaskList";


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  return (
    <div className="pt-20 flex flex-col items-center">
      <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
      <TaskList tasks={tasks} setTasks={setTasks}></TaskList>
    </div>
  );
};

export default Dashboard;