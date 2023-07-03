import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const TodoForm = () => {
  const { addTodo } = useAddTodo();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      {addTodo.error && addTodo.error.message}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(ref.current?.value);
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <input ref={ref} type="text" />
        <button>{addTodo.isLoading ? "loading" : "add"}</button>
      </form>
    </>
  );
};

export default TodoForm;
