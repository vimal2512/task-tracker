import React from "react";

const TaskItem = ({task, onToggle, onDelete}) => {
  console.log("Render TaskItem:", task.title);
   return(
    <li>
        <span
          onClick={() => onToggle(task.id)}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer"
          }}
        >
          {task.title}
        </span>

        <button onClick={() => onDelete(task.id)}>
            Cancel
        </button>
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

