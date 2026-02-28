import React from "react";
import { useState } from "react";

const TaskItem = ({task, onToggle, onDelete, onUpdate}) => {
  console.log("Render TaskItem:", task.title);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleUpdate = () => {
    const trimmed = editValue.trim();

    if(trimmed && trimmed !== task.title){
      onUpdate(task.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter") handleUpdate();

    if(e.key === "Escape") {
      setEditValue(task.title);
      setIsEditing(false);
    }
  }

   return(
    <li>
      {isEditing ? (
        <input 
           value={editValue}
           autoFocus
           onChange={(e) => setEditValue(e.target.value)}
           onBlur={handleUpdate}
           onKeyDown={handleKeyDown}
           />
      ):(

 <div>
        <span
          onClick={() => onToggle(task.id)}
          onDoubleClick={() => setIsEditing(true)}
          className={task.completed}
        >
          {task.title}
        </span>

        <button onClick={() => onDelete(task.id)}>
            Cancel
        </button>
        </div>

      )}
     
    </li>
    
   )
}

// export default TaskItem;
export default React.memo(TaskItem);

// why this ?
// onToggle(task.id)  => No inline business logic, this keeps data flow clean.

// Not
// onToggle(task) 
// child should not control data shape
// parent owns state logic


// Component is pure
// Same props -> same UI
// so we can memoise without rewriting anything
// export default React.memo(TaskItem)

