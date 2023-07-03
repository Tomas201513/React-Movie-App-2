import "./App.css";
import AddTodo from "./components/TodoForm";
import { useTodo } from "./hooks/useTodo";

const App = () => {
  const { data: todo, error, isLoading } = useTodo();
  if (error) return <>error</>;
  if (isLoading) return <>Loading ...</>;
  return (
    <>
      <AddTodo />
      <ul>
        {todo?.map((page) => (
          <li key={page.id}>{page.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
