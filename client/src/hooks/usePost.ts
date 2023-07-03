import axios from "axios";
import { useQuery } from "react-query";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string
  }
  
  
  const usePost = (userId:string | undefined) => {
    const fetchData = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
          userId
        }
      })
      .then((res) => {
        return res.data;
      });

  return useQuery<Post[], Error>({
    queryKey:userId? ["users",userId,'posts']:["users",'posts'],
     queryFn: fetchData, 
     staleTime: 10*1000 });

  }
  
  export default usePost