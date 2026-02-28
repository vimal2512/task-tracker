import { useState } from "react";

const TaskInput = ({addTask}) => {
    const[title,setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = title.trim();
        if(!trimmed) return;

        addTask(trimmed);
        setTitle("");
    }

    return(
        <div className="task-input">
        <form action="" onSubmit={handleSubmit}>
          <input 
           type="text" 
           placeholder="Enter task"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           />

          <button type="submit">Add</button>
        </form>
        </div>
    )
}

export default TaskInput;