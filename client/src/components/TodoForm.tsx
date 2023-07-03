import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../hooks/useTodo";
import axios from "axios";
const TodoForm = () => {
  const queryClient = useQueryClient();
  const addData = (todos: Todo) =>
    axios
      .post<Todo>("https://jsonplaceholder.typicode.com/todos", todos)
      .then((res) => res.data);

  const AddTodo = useMutation<Todo, Error, Todo>({
    mutationFn: addData,
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      {AddTodo.error && AddTodo.error.message}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(ref.current?.value);
          if (ref.current && ref.current.value)
            AddTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <input ref={ref} type="text" />
        <button>{AddTodo.isLoading ? "loading" : "add"}</button>
      </form>
    </>
  );
};

export default TodoForm;
