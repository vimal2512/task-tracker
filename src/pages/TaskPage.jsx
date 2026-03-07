// import { useEffect, useState } from "react";
// import TaskInput from "../features/task/TaskInput";
// import TaskList from "../features/task/TaskList";
// import FilterBar from "../features/task/components/FilterBar";
// import { useCallback } from "react";

// const TaskPage = () => {
//     console.log("Render TaskPage");

//     const [tasks, setTasks] = useState([]);

//     const [filter, setFilter] = useState(() => {
//         return localStorage.getItem("filter") || "all"
//     });

//     useEffect(() => {
//         localStorage.setItem("filter", filter)
//     }, [filter]);

//     const addTask = useCallback((title) => {
//         const newTask = {
//             id: crypto.randomUUID(),
//             title,
//             completed: false
//         };

//         setTasks((prev) => [...prev, newTask]);
//     },[]);

//     const toggleTask = useCallback((id) => {
//         setTasks((prev) =>
//             prev.map((t) =>
//                 t.id === id ? { ...t, completed: !t.completed } : t
//             )
//         );
//     },[]);

//     const deleteTask = useCallback((id) => {
//         setTasks((prev) => prev.filter((t) => t.id !== id));
//     },[]);

//     const updateTask = useCallback((id, newTitle) => {
//         setTasks(prev =>
//             prev.map(t =>
//                 t.id === id ? { ...t, title: newTitle } : t
//             )
//         );
//     },[]);

//     const clearCompleted = useCallback(() => {
//         setTasks(prev => prev.filter(task => !task.completed));
//     },[]);

//     const filteredTasks = tasks.filter((task) => {
//         if (filter === "active") return !task.completed;
//         if (filter === "completed") return task.completed;
//         return true;
//     });

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter(t => t.completed).length;
//     const activeTasks = totalTasks - completedTasks;


//     const testBatching = () => {
//         console.log("click start");

//         setTasks(prev => [...prev]);
//         setFilter("all");
//         setFilter("active");

//         console.log("click end");
//     }

//     return (
//         <div>
//             <h1>Task Tracker</h1>

//             <p>
//                 Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
//             </p>

//             <TaskInput addTask={addTask} />

//             {totalTasks === 0 ? (
//                 <p>No tasks yet. Add one.</p>
//             ) : (
//                 <TaskList
//                     tasks={filteredTasks}
//                     toggleTask={toggleTask}
//                     deleteTask={deleteTask}
//                     updateTask={updateTask}
//                 />
//             )}

//             <FilterBar
//                 filter={filter}
//                 setFilter={setFilter}
//                 completedTasks={completedTasks}
//                 clearCompleted={clearCompleted}
//             />

//             <button onClick={testBatching}>Test Batching</button>
//         </div>
//     );
// };

// export default TaskPage;



// Server state using react query


// import { useEffect, useState, useCallback } from "react";
// import TaskInput from "../features/task/TaskInput";
// import TaskList from "../features/task/TaskList";
// import FilterBar from "../features/task/components/FilterBar";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchTasks, addTaskApi, toggleTaskApi, deleteTaskApi, updateTaskApi } from "../services/taskService";

// const TaskPage = () => {
//     console.log("Render TaskPage");

//    const queryClient = useQueryClient();

//    // Server state

//    const { data: tasks = [], isLoading } = useQuery({
//       queryKey: ["tasks"],
//       queryFn: fetchTasks
//    })

// // UI State
// const[filter, setFilter] = useState(()=> {
//     return localStorage.getItem("filter") || "all"
// })

// useEffect(() => {
//     localStorage.setItem("filter", filter);
// },[filter]);

// // Add Task
// const addTaskMutation = useMutation({
//     mutationFn: addTaskApi,
//     onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks"]})
// });


// const addTask = useCallback((title) => {
//     addTaskMutation.mutate(title);
// },[addTaskMutation]);

// // Toggle task

// const toggleTaskMutation = useMutation({
//     mutationFn: toggleTaskApi,
//     onSuccess: () => queryClient.invalidateQueries(["tasks"])
// });


// const toggleTask = useCallback((id) => {
//     toggleTaskMutation.mutate(id);
// },[toggleTaskMutation]);

// // Delete task

// const deleteTaskMutation = useMutation({
//     mutationFn: deleteTaskApi,
//     onSuccess: () => queryClient.invalidateQueries(["tasks"])
// });

// const deleteTask = useCallback((id) => {
//     deleteTaskMutation.mutate(id);
// }, [deleteTaskMutation])


// // Clear completed

// const clearCompleted = () => {
//     const completed = tasks.filter(t => t.completed);

//     completed.forEach(t => {
//         deleteTaskMutation.mutate(t.id);
//     });
// };

// // Filtered Tasks

// const filteredTasks = tasks.filter((task) => {
//     if(filter === "active") return !task.completed;
//     if(filter === "completed") return task.completed;

//     return true;
// })

// // Update Task

// const updateTaskMutation = useMutation({
//   mutationFn: updateTaskApi,
//   onSuccess: () =>
//     queryClient.invalidateQueries({ queryKey: ["tasks"] })
// });

// const updateTask = useCallback((id, title) => {
//   updateTaskMutation.mutate({ id, title });
// }, [updateTaskMutation]);


// // Counters
// const totalTasks = tasks.length;
// const completedTasks = tasks.filter(t => t.completed).length;
// const activeTasks = totalTasks - completedTasks;

// if(isLoading) return <p>Loading tasks...</p>
//     return (
//         <div className="container">
//           <h1>Task Tracker</h1>

//           <p>
//             Total: {totalTasks} | Active : {activeTasks} | Completed: {completedTasks}
//           </p>

//           <TaskInput addTask={addTask}/>

//           {totalTasks === 0 ? (
//             <p>No tasks yet. Add one.</p>
//           ):(
//             <TaskList 
//               tasks={filteredTasks}
//               toggleTask={toggleTask}
//               deleteTask={deleteTask}
//                updateTask={updateTask}
//             />
//           )}

//           <FilterBar
//               filter={filter}
//               setFilter={setFilter}
//               completedTasks={completedTasks}
//               clearCompleted={clearCompleted}
//           />
//         </div>
//     );
// };

// export default TaskPage;




// import { useEffect, useState, useCallback } from "react";
// import TaskInput from "../features/task/TaskInput";
// import TaskList from "../features/task/TaskList";
// import FilterBar from "../features/task/components/FilterBar";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchTasks,
//   addTaskApi,
//   toggleTaskApi,
//   deleteTaskApi,
//   updateTaskApi
// } from "../services/taskService";

// const TaskPage = () => {
//   console.log("Render TaskPage");

//   const queryClient = useQueryClient();

//   // 🌐 SERVER STATE
//   const { data: tasks = [], isLoading } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: fetchTasks
//   });

//   // 🎛 UI STATE
//   const [filter, setFilter] = useState(() => {
//     return localStorage.getItem("filter") || "all";
//   });

//   useEffect(() => {
//     localStorage.setItem("filter", filter);
//   }, [filter]);

//   // ➕ ADD TASK (OPTIMISTIC)
//   const addTaskMutation = useMutation({
//     mutationFn: addTaskApi,

//     onMutate: async (title) => {
//       await queryClient.cancelQueries({ queryKey: ["tasks"] });

//       const previousTasks = queryClient.getQueryData(["tasks"]);

//       const optimisticTask = {
//         id: crypto.randomUUID(),
//         title,
//         completed: false
//       };

//       queryClient.setQueryData(["tasks"], (old = []) => [
//         ...old,
//         optimisticTask
//       ]);

//       return { previousTasks };
//     },

//     onError: (err, title, context) => {
//       queryClient.setQueryData(["tasks"], context.previousTasks);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     }
//   });

//   const addTask = useCallback((title) => {
//     addTaskMutation.mutate(title);
//   }, [addTaskMutation]);

//   // 🔁 TOGGLE TASK (OPTIMISTIC)
//   const toggleTaskMutation = useMutation({
//     mutationFn: toggleTaskApi,

//     onMutate: async (id) => {
//       await queryClient.cancelQueries({ queryKey: ["tasks"] });

//       const previousTasks = queryClient.getQueryData(["tasks"]);

//       queryClient.setQueryData(["tasks"], (old = []) =>
//         old.map((task) =>
//           task.id === id
//             ? { ...task, completed: !task.completed }
//             : task
//         )
//       );

//       return { previousTasks };
//     },

//     onError: (err, id, context) => {
//       queryClient.setQueryData(["tasks"], context.previousTasks);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     }
//   });

//   const toggleTask = useCallback((id) => {
//     toggleTaskMutation.mutate(id);
//   }, [toggleTaskMutation]);

//   // ❌ DELETE TASK (OPTIMISTIC)
//   const deleteTaskMutation = useMutation({
//     mutationFn: deleteTaskApi,

//     onMutate: async (id) => {
//       await queryClient.cancelQueries({ queryKey: ["tasks"] });

//       const previousTasks = queryClient.getQueryData(["tasks"]);

//       queryClient.setQueryData(["tasks"], (old = []) =>
//         old.filter((task) => task.id !== id)
//       );

//       return { previousTasks };
//     },

//     onError: (err, id, context) => {
//       queryClient.setQueryData(["tasks"], context.previousTasks);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     }
//   });

//   const deleteTask = useCallback((id) => {
//     deleteTaskMutation.mutate(id);
//   }, [deleteTaskMutation]);

//   // ✏️ UPDATE TASK TITLE (OPTIMISTIC)
//   const updateTaskMutation = useMutation({
//     mutationFn: updateTaskApi,

//     onMutate: async ({ id, title }) => {
//       await queryClient.cancelQueries({ queryKey: ["tasks"] });

//       const previousTasks = queryClient.getQueryData(["tasks"]);

//       queryClient.setQueryData(["tasks"], (old = []) =>
//         old.map((task) =>
//           task.id === id ? { ...task, title } : task
//         )
//       );

//       return { previousTasks };
//     },

//     onError: (err, variables, context) => {
//       queryClient.setQueryData(["tasks"], context.previousTasks);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     }
//   });

//   const updateTask = useCallback((id, title) => {
//     updateTaskMutation.mutate({ id, title });
//   }, [updateTaskMutation]);

//   // 🧹 CLEAR COMPLETED
//   const clearCompleted = () => {
//     tasks
//       .filter((t) => t.completed)
//       .forEach((t) => deleteTaskMutation.mutate(t.id));
//   };

//   // 🎯 FILTER
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "active") return !task.completed;
//     if (filter === "completed") return task.completed;
//     return true;
//   });

//   // 📊 COUNTERS
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.completed).length;
//   const activeTasks = totalTasks - completedTasks;

//   if (isLoading) return <p>Loading tasks...</p>;

//   return (
//     <div className="container">
//       <h1>Task Tracker</h1>

//       <p>
//         Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
//       </p>

//       <TaskInput addTask={addTask} />

//       {totalTasks === 0 ? (
//         <p>No tasks yet. Add one.</p>
//       ) : (
//         <TaskList
//           tasks={filteredTasks}
//           toggleTask={toggleTask}
//           deleteTask={deleteTask}
//           updateTask={updateTask}
//         />
//       )}

//       <FilterBar
//         filter={filter}
//         setFilter={setFilter}
//         completedTasks={completedTasks}
//         clearCompleted={clearCompleted}
//       />
//     </div>
//   );
// };

// export default TaskPage;


// import { useEffect, useState } from "react";
// import TaskInput from "../features/task/TaskInput";
// import TaskList from "../features/task/TaskList";
// import FilterBar from "../features/task/components/FilterBar";
// import { useTasks } from "../hooks/useTasks";

// const TaskPage = () => {
//   console.log("Render TaskPage");

//   // 🧠 SERVER STATE (from custom hook)
//   const {
//     tasks,
//     isLoading,
//     addTask,
//     toggleTask,
//     deleteTask,
//     updateTask
//   } = useTasks();

//   // 🎛 UI STATE
//   const [filter, setFilter] = useState(() => {
//     return localStorage.getItem("filter") || "all";
//   });

//   useEffect(() => {
//     localStorage.setItem("filter", filter);
//   }, [filter]);

//   // 🧹 CLEAR COMPLETED (UI orchestration only)
//   const clearCompleted = () => {
//     tasks
//       .filter((t) => t.completed)
//       .forEach((t) => deleteTask(t.id));
//   };

//   // 🎯 FILTER
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "active") return !task.completed;
//     if (filter === "completed") return task.completed;
//     return true;
//   });

//   // 📊 COUNTERS
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.completed).length;
//   const activeTasks = totalTasks - completedTasks;

//   if (isLoading) return <p>Loading tasks...</p>;

//   return (
//     <div className="container">
//       <h1>Task Tracker</h1>

//       <p>
//         Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
//       </p>

//       <TaskInput addTask={addTask} />

//       {totalTasks === 0 ? (
//         <p>No tasks yet. Add one.</p>
//       ) : (
//         <TaskList
//           tasks={filteredTasks}
//           toggleTask={toggleTask}
//           deleteTask={deleteTask}
//           updateTask={updateTask}
//         />
//       )}

//       <FilterBar
//         filter={filter}
//         setFilter={setFilter}
//         completedTasks={completedTasks}
//         clearCompleted={clearCompleted}
//       />
//     </div>
//   );
// };

// export default TaskPage;



// The real server state version


import { useState } from "react";
import TaskInput from "../features/task/TaskInput";
import TaskList from "../features/task/TaskList";
import FilterBar from "../features/task/components/FilterBar";
import { useTasks } from "../hooks/useTasks";

const TaskPage = () => {
  const {
    tasks,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
  } = useTasks();

  const [filter, setFilter] = useState("all");

  if (isLoading) return <p>Loading...</p>;

  // ✅ DERIVED STATE (same as old version — but from server data)

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((t) => t.completed).length;

  const activeTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      {/* ✅ COUNTERS (RESTORED) */}
      <p>
        Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
      </p>

      <TaskInput addTask={addTask} />

      {/* ✅ EMPTY STATE (RESTORED) */}
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