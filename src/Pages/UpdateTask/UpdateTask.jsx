// pages/UpdateTask.jsx
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosSecure from "../../Hooks/axiosSecure";
import toast from "react-hot-toast";
import TaskForm from "../../Component/TaskForm/TaskForm";

const UpdateTask = () => {
  const location = useLocation();
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const taskFromState = location.state;
  const taskId = taskFromState?._id || paramId;

  const [title, setTitle] = useState(taskFromState?.title || "");
  const [description, setDescription] = useState(taskFromState?.description || "");
  const [priority, setPriority] = useState(taskFromState?.priority || "low");
  const [deadline, setDeadline] = useState(taskFromState?.deadline || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTask = { title, description, priority, deadline };

    try {
      const res = await axiosSecure.patch(`/tasks/update/${taskId}`, updatedTask);
      if (res.status === 200) {
        toast.success("Task updated!");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="bg-gradient-to-r pt-20 px-4 from-blue-200 via-blue-300 to-blue-400 min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>
        <TaskForm
          onSubmit={handleUpdate}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          deadline={deadline}
          setDeadline={setDeadline}
          priority={priority}
          setPriority={setPriority}
          buttonLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default UpdateTask;
