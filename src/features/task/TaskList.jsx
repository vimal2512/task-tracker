import TaskItem from "./components/TaskItem";


const TaskList = ({tasks, toggleTask, deleteTask}) => {
  
  if(!tasks.length) {
    return <p>No tasks found</p>
  }

  console.log("Render TaskList");
  return(
    <ul>
      {tasks.map((task) => (
        <TaskItem  
           key={task.id} 
           task={task} 
           onToggle={toggleTask} 
           onDelete={deleteTask}
        />
      ))}
    </ul>
  )
}


export default TaskList;