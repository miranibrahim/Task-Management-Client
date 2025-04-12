// pages/CreateTask.jsx
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import axiosSecure from "../../Hooks/axiosSecure";
import TaskForm from "../TaskForm/TaskForm";

const CreateTask = ({ refetch }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");

  const handleCreate = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      deadline,
      priority,
      status: "todo",
      userEmail: user.email,
    };

    try {
      const res = await axiosSecure.post("/tasks", newTask);
      if (res.data.insertedId) {
        toast.success("Task created successfully!");
        setTitle("");
        setDescription("");
        setDeadline("");
        setPriority("low");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>
        <TaskForm
          onSubmit={handleCreate}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          deadline={deadline}
          setDeadline={setDeadline}
          priority={priority}
          setPriority={setPriority}
          buttonLabel="Create Task"
        />
      </div>
    </div>
  );
};

CreateTask.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default CreateTask;
