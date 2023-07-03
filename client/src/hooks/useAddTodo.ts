import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../hooks/useTodo";
import axios from "axios";
import { CACHE_KEY_TODOS } from "./constants";
import APIClient from '../services/apiClient'

const apiClient= new APIClient<Todo>('/todos')
const useAddTodo = () => {
    const queryClient = useQueryClient();
    const addData = (todos: Todo) =>
      axios
        .post<Todo>("/todos", todos)
        .then((res) => res.data);
  
    const addTodo = useMutation<Todo, Error, Todo>({
      mutationFn: addData,
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