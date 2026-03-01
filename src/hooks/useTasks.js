import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  addTaskApi,
  toggleTaskApi,
  deleteTaskApi,
  updateTaskApi
} from "../services/taskService";



export const useTasks = () => {
  const queryClient = useQueryClient();

  // 🌐 QUERY
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks
  });

  // ➕ ADD
  const addTaskMutation = useMutation({
    mutationFn: addTaskApi,
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      const optimisticTask = {
        id: crypto.randomUUID(),
        title,
        completed: false
      };

      queryClient.setQueryData(["tasks"], (old = []) => [
        ...old,
        optimisticTask
      ]);

      return { previous };
    },
    onError: (err, title, ctx) =>
      queryClient.setQueryData(["tasks"], ctx.previous),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
  });

  // 🔁 TOGGLE
  const toggleTaskMutation = useMutation({
    mutationFn: toggleTaskApi,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );

      return { previous };
    },
    onError: (err, id, ctx) =>
      queryClient.setQueryData(["tasks"], ctx.previous),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
  });

  // ❌ DELETE
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskApi,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) =>
        old.filter((t) => t.id !== id)
      );

      return { previous };
    },
    onError: (err, id, ctx) =>
      queryClient.setQueryData(["tasks"], ctx.previous),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
  });

  // ✏️ UPDATE
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskApi,
    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, title } : t))
      );

      return { previous };
    },
    onError: (err, vars, ctx) =>
      queryClient.setQueryData(["tasks"], ctx.previous),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
  });

  return {
    tasks,
    isLoading,
    addTask: addTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate
  };
};

