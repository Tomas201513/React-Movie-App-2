import { useQuery } from "react-query";
import { CACHE_KEY_TODOS } from "./constants";
import APIClient from '../services/apiClient'

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: false;
}

const apiClient= new APIClient<Todo>('/todos')
  
export const useTodo = () => {
  

  return useQuery<Todo[], Error>({
    queryKey:CACHE_KEY_TODOS, 
    queryFn: apiClient.getAll,
     staleTime: 10*1000 
    });

  }
  

