import { useCallback, useContext, useEffect, useState } from "react";
import CreateTask from "../../Component/AddTaskModal/CreateTask";
import TaskList from "../../Component/AddTaskModal/TaskList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Toaster } from "react-hot-toast";

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
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-20 w-4/5 mx-auto">
        <CreateTask
          tasks={tasks}
          setTasks={setTasks}
          fetchTasks={fetchTasks}
        ></CreateTask>
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          fetchTasks={fetchTasks}
        ></TaskList>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
