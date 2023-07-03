import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../hooks/useTodo";
import { CACHE_KEY_TODOS } from "./constants";
import APIClient from '../services/apiClient'

const apiClient= new APIClient<Todo>('/todos')
const useAddTodo = () => {
    const queryClient = useQueryClient();

    const addTodo = useMutation<Todo, Error, Todo>({
      mutationFn: apiClient.post,
      onSuccess: (savedTodo, newTodo) => {
        queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos=[]) => [
          savedTodo,
          ...todos,
        ]);
      },
    });

    return {addTodo}
}

export default useAddTodo