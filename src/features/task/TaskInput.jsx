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
        <form action="" onSubmit={handleSubmit}>
          <input 
           type="text" 
           placeholder="Enter task"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           />

          <button type="submit">Add</button>
        </form>
    )
}

export default TaskInput;