import { useState } from "react";
import "./App.css";
// import useData from "./hooks/useData";
import usePost from "./hooks/usePost";

const App = () => {
  const pageSize = 10;
  const {
    data: todo,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePost({ pageSize });

  if (error) return <>error</>;
  if (isLoading) return <>Loading ...</>;
  return (
    <>
      <ul>
        {todo?.pages.map((page) => (
          <>
            {page.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </>
        ))}
      </ul>

      <button
        disabled={isFetchingNextPage}
        onClick={() => {
          fetchNextPage();
        }}
      >
        {isFetchingNextPage ? "Loading ..." : "Load More"}
      </button>
    </>
  );
};

export default App;
