import { useCallback, useContext, useEffect, useState } from "react";
import CreateTask from "../../Component/AddTaskModal/CreateTask";
import TaskList from "../../Component/AddTaskModal/TaskList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";


const Dashboard = () => {
  const user = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axiosPublic.get(`/tasks/${user.user.email}`);
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [axiosPublic, user.user.email]);
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  

  console.log(tasks);
  return (
    <div className="pt-20 flex flex-col items-center">
      <CreateTask tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}></CreateTask>
      <TaskList tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}></TaskList>
    </div>
  );
};

export default Dashboard;