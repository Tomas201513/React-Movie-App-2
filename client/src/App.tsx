import { useState } from "react";
import "./App.css";
// import useData from "./hooks/useData";
import usePost from "./hooks/usePost";

const App = () => {
  const pageSize = 10;
  const [page, SetPage] = useState(1);
  const { data: todo, error, isLoading } = usePost({ page, pageSize });

  if (error) return <>error</>;
  if (isLoading) return <>Loading ...</>;
  return (
    <>
      <ul>
        {todo?.map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => {
          SetPage(page - 1);
        }}
      >
        previous
      </button>
      <button
        disabled={page === pageSize}
        onClick={() => {
          SetPage(page + 1);
        }}
      >
        next
      </button>
    </>
  );
};

export default App;
