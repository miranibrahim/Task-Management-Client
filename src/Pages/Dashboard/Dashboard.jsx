import { useContext } from "react";
import CreateTask from "../../Component/AddTaskModal/CreateTask";
import TaskList from "../../Component/AddTaskModal/TaskList";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const user = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: tasks=[],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async() => {
      const res  = await axiosPublic.get(`/tasks/${user.user.email}`);
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
      <div className="pt-20 w-4/5 mx-auto">
        <CreateTask tasks={tasks} refetch={refetch}></CreateTask>
        <TaskList tasks={tasks} refetch={refetch}></TaskList>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
