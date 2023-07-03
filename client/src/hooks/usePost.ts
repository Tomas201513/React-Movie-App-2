import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string
  }
interface PostQuery{
pageSize: number
}
  
  
  const usePost = (query:PostQuery) => {
    const fetchData = ({pageParam=1}) =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/todos",{
        params:{
          _start: (pageParam-1)*query.pageSize, 
          _limit: query.pageSize
        }
      })
      .then((res) => {
        return res.data;
      });

  return useInfiniteQuery<Post[],Error>({
    queryKey:['posts', query],
     queryFn: fetchData, 
     staleTime: 10*1000 ,
    keepPreviousData:true,
    getNextPageParam: (lastPage,allPage)=>{
      return lastPage.length>0 ? allPage.length+1:undefined;
    }
    });

  }
  
  export default usePost