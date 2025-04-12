import { useContext } from "react";
import CreateTask from "../../Component/AddTaskModal/CreateTask";
import TaskList from "../../Component/AddTaskModal/TaskList";
import { AuthContext } from "../../Provider/AuthProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/axiosSecure";

const Dashboard = () => {
  const user = useContext(AuthContext);

  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.user.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching tasks:", error);
    return <div>Error fetching tasks</div>;
  }
  console.log(tasks);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="pt-20 mx-auto bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen">
        <div className="w-4/5 mx-auto">
          <CreateTask refetch={refetch}></CreateTask>
          <TaskList tasks={tasks} refetch={refetch}></TaskList>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
