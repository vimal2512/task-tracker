let tasks = [
    {id: "1", title: "Learn React", completed: false},
    {id: "2", title: "Build Project", completed: false}
];


export const fetchTasks = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(tasks), 500)
  );
  
export const addTaskApi = (title) => {
    new Promise(resolve => {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            completed: false
        };
        tasks.push(newTask);
        setTimeout(() => resolve(newTask), 300)
    })
}

export const toggleTaskApi = (id) => {
      new Promise(resolve => {
        tasks = tasks.map(t =>
            t.id === id ? {...t, completed: !t.completed} : t
        );
        setTimeout(() => resolve(), 300)
      })
}

export const deleteTaskApi = (id) => {
    new Promise(resolve => {
        tasks = tasks.filter(t => t.id !== id);
        setTimeout(() => resolve(), 300)
    })
}


export const updateTaskApi = ({ id, title }) =>
  new Promise((resolve) => {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, title } : t
    );

    setTimeout(() => resolve(), 300);
  });

