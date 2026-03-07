// import React from "react";
// import { useState } from "react";

// const TaskItem = ({task, onToggle, onDelete, onUpdate}) => {
//   console.log(task);
//   console.log("Render TaskItem:", task.title);
//   console.log("toggle fn changed:", onToggle);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(task.title);

//   const handleUpdate = () => {
//     console.log("HANDLE UPDATE CALLED")
//     const trimmed = editValue.trim();

//     if(trimmed && trimmed !== task.title){
//       onUpdate(task.id, trimmed);
//     }

//     setIsEditing(false);
//   };

//   const handleKeyDown = (e) => {
//     if(e.key === "Enter") handleUpdate();

//     if(e.key === "Escape") {
//       setEditValue(task.title);
//       setIsEditing(false);
//     }
//   }

//    return(
//     <li>
//       {isEditing ? (
//         <input 
//            value={editValue}
//            autoFocus
//            onChange={(e) => setEditValue(e.target.value)}
//            onBlur={handleUpdate}
//            onKeyDown={handleKeyDown}
//            />
//       ):(

//  <div>
//         <span
//           onClick={() => onToggle(task._id)}
//           onDoubleClick={() => setIsEditing(true)}
//           className={task.completed ? "completed" : ""}
//         >
//           {task.title}
//         </span>

//         <button onClick={() => onDelete(task._id)}>
//             Cancel
//         </button>
//         </div>

//       )}
     
//     </li>
    
//    )
// }

// // export default TaskItem;
// export default React.memo(TaskItem);

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


import React, { useState, useRef, useEffect } from "react";

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const inputRef = useRef(null);

  // keep input focused when edit mode starts
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleUpdate = () => {
    const trimmed = editValue.trim();

    if (trimmed && trimmed !== task.title) {
      onUpdate({ id: task._id, title: trimmed });   // ✅ FIXED
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleUpdate();

    if (e.key === "Escape") {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div>
          <span
            onClick={() => onToggle(task._id)}
            onDoubleClick={() => setIsEditing(true)}
            className={task.completed ? "completed" : ""}
          >
            {task.title}
          </span>

          <button onClick={() => onDelete(task._id)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default React.memo(TaskItem);