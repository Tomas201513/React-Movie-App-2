import { useState } from "react";
import "./App.css";
// import useData from "./hooks/useData";
import usePost from "./hooks/usePost";

const App = () => {
  const [userId, SetUserId] = useState("");
  const { data: todo, error, isLoading } = usePost(userId);

  if (error) return <>error</>;
  if (isLoading) return <>Loading ...</>;
  return (
    <>
      <select
        value={userId}
        onChange={(e) => {
          SetUserId(e.target.value);
        }}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul>
        {todo?.map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
