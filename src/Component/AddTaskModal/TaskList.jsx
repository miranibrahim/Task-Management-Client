import { useState } from "react";


const TaskList = () => {
    const [todo, setTodo] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    return (
        <div>
            list
        </div>
    );
};

export default TaskList;