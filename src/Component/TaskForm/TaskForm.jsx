// components/TaskForm.jsx
import PropTypes from "prop-types";

const TaskForm = ({
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  priority,
  setPriority,
  buttonLabel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows="4"
        required
      />
      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
      <input
        type="datetime-local"
        className="w-full p-2 border rounded"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  deadline: PropTypes.string.isRequired,
  setDeadline: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
  setPriority: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default TaskForm;
