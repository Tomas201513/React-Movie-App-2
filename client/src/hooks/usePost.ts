import axios from "axios";
import { useQuery } from "react-query";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string
  }
interface PostQuery{
page: number;
pageSize: number
}
  
  
  const usePost = (query:PostQuery) => {
    const fetchData = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
          _start: query.page,
          _limit: query.pageSize
        }
      })
      .then((res) => {
        return res.data;
      });

  return useQuery<Post[], Error>({
    queryKey:['posts', query],
     queryFn: fetchData, 
     staleTime: 10*1000 ,
    keepPreviousData:true
    });

  }
  
  export default usePost