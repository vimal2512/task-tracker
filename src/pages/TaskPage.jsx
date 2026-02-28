// import { useEffect, useState } from "react";
// import TaskInput from "../features/task/TaskInput";
// import TaskList from "../features/task/TaskList";
// import FilterBar from "../features/task/components/FilterBar";

// const TaskPage = () => {
//     console.log("Render TaskPage");
//     const [tasks, setTasks] = useState([]);
//     // const[filter, setFilter] = useState("all");

//     const[filter,setFilter] = useState(() => {
//         return localStorage.getItem("filter") || "all"
//     })

//     useEffect(() => {
//         localStorage.setItem("filter", filter)
//     },[filter]);

//     const addTask = (title) => {

//         const newTask = {
//             id: crypto.randomUUID(),
//             title,
//             completed: false
//         };

//         setTasks((prev) => [...prev, newTask]);
//     };

//     const toggleTask = (id) => {

//         setTasks((prev) =>
//             prev.map((t) =>
//                 t.id === id ? {...t, completed: !t.completed} : t
//             )
//         );
//     };

//     const deleteTask = (id) => {
//         setTasks((prev) => prev.filter((t)=> t.id !== id));
//     }

//    const updateTask = (id, newTitle) => {
//     setTasks(prev =>
//         prev.map(t =>
//             t.id === id ? {...t, title: newTitle } : t
//         )
//     )
//    }

//    const clearCompleted = () => {
//     setTasks(prev => prev.filter(task => !task.completed));
//    }

//     const filteredTasks = tasks.filter((task) => {
//         if(filter === "active") return !task.completed;
//         if(filter === "completed") return task.completed;

//         return true;
//     })

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter(t => t.completed).length;
//     const activeTasks = totalTasks - completedTasks;
    
//     return(
//         <div>
//             <h1>Task Tracker</h1>

//             <p>
//                 Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
//             </p>

//              <TaskInput addTask={addTask}/>

//              <TaskList
//                 tasks={filteredTasks}
//                 toggleTask={toggleTask}
//                 deleteTask={deleteTask}
//                 updateTask={updateTask}
//              />

//              <FilterBar filter={filter} setFilter={setFilter}/>

//              <div>
//                 <button onClick={() => setFilter("all")}>All</button>
//                 <button onClick={() => setFilter("active")}>Active</button>
//                 <button onClick={()=> setFilter("completed")}>Completed</button>
//                 {/* <button onClick={clearCompleted}>Clear Completed</button> */}

//                 {completedTasks > 0 && (
//                     <button onClick={clearCompleted}>
//                         Clear Completed
//                     </button>
//                 )}
//              </div>
//         </div>
//     );
// };


// export default TaskPage;


import { useEffect, useState } from "react";
import TaskInput from "../features/task/TaskInput";
import TaskList from "../features/task/TaskList";
import FilterBar from "../features/task/components/FilterBar";

const TaskPage = () => {
    console.log("Render TaskPage");

    const [tasks, setTasks] = useState([]);

    const [filter, setFilter] = useState(() => {
        return localStorage.getItem("filter") || "all"
    });

    useEffect(() => {
        localStorage.setItem("filter", filter)
    }, [filter]);

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
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTask = (id, newTitle) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, title: newTitle } : t
            )
        );
    };

    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;

    return (
        <div>
            <h1>Task Tracker</h1>

            <p>
                Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
            </p>

            <TaskInput addTask={addTask} />

            {totalTasks === 0 ? (
                <p>No tasks yet. Add one.</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            )}

            <FilterBar
                filter={filter}
                setFilter={setFilter}
                completedTasks={completedTasks}
                clearCompleted={clearCompleted}
            />
        </div>
    );
};

export default TaskPage;