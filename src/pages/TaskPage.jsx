import { useState } from "react";
import TaskInput from "../features/task/TaskInput";
import TaskList from "../features/task/TaskList";
import FilterBar from "../features/task/components/FilterBar";

const TaskPage = () => {
    console.log("Render TaskPage");
    const [tasks, setTasks] = useState([]);
    const[filter, setFilter] = useState("all");

    const addTask = (title) => {

        const newTask = {
            id: crypto.randomUUID(),
            title,
            completed: false
        };

        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = (id) => {

        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? {...t, completed: !t.completed} : t
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t)=> t.id !== id));
    }

    const filteredTasks = tasks.filter((task) => {
        if(filter === "active") return !task.completed;
        if(filter === "completed") return task.completed;

        return true;
    })

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;
    
    return(
        <div>
            <h1>Task Tracker</h1>

            <p>
                Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
            </p>
            
             <TaskInput addTask={addTask}/>

             <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
             />

             <FilterBar filter={filter} setFilter={setFilter}/>

             <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={()=> setFilter("completed")}>Completed</button>
             </div>
        </div>
    );
};


export default TaskPage;