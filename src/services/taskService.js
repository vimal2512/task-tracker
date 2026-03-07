// let tasks = [
//     {id: "1", title: "Learn React", completed: false},
//     {id: "2", title: "Build Project", completed: false}
// ];


// export const fetchTasks = () =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve(tasks), 500)
//   );
  
// export const addTaskApi = (title) => {
//     new Promise(resolve => {
//         const newTask = {
//             id: crypto.randomUUID(),
//             title,
//             completed: false
//         };
//         tasks.push(newTask);
//         setTimeout(() => resolve(newTask), 300)
//     })
// }

// export const toggleTaskApi = (id) => {
//       new Promise(resolve => {
//         tasks = tasks.map(t =>
//             t.id === id ? {...t, completed: !t.completed} : t
//         );
//         setTimeout(() => resolve(), 300)
//       })
// }

// export const deleteTaskApi = (id) => {
//     new Promise(resolve => {
//         tasks = tasks.filter(t => t.id !== id);
//         setTimeout(() => resolve(), 300)
//     })
// }


// export const updateTaskApi = ({ id, title }) =>
//   new Promise((resolve) => {
//     tasks = tasks.map((t) =>
//       t.id === id ? { ...t, title } : t
//     );

//     setTimeout(() => resolve(), 300);
//   });


import axios from "axios"

// const API_URL = "http://localhost:5000/api/tasks"

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/api/tasks`

//GET ALL
export const fetchTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
}

// CREATE
export const addTaskApi = async (title) => {
  const { data } = await axios.post(API_URL, {title});
  return data;
}

// TOGGLE
export const toggleTaskApi = async (id) => {
  const {data} = await axios.patch(`${API_URL}/${id}/toggle`);
  return data;
}


// UPDATE
export const updateTaskApi = async({id,title}) => {
  const { data } = await axios.put(`${API_URL}/${id}`, { title });
  return data;
}

// Delete
export const deleteTaskApi = async(id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
}


// Clear completed
export const clearCompletedApi = async () => {
  const { data } = await axios.delete(`${API_URL}/completed/all`);
  return data;
};

