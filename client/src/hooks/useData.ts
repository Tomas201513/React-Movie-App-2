import axios from "axios";
import { useQuery } from "react-query";

interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: false;
  }
  
  
  const useData = () => {
    const fetchData = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        return res.data;
      });

  return useQuery<Todo[], Error>({queryKey:["todos"], queryFn: fetchData, staleTime: 10*1000 });

  }
  
  export default useData