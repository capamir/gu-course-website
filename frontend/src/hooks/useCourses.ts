import { useQuery } from "@tanstack/react-query";
import { OrderType } from "../types/Order";
import { CoursesApiClient } from "../services/apiServices";

const useCourses = () =>
  useQuery<OrderType[], Error>({
    queryKey: ["courses"],
    queryFn: CoursesApiClient.getAll,
    staleTime: 60 * 60 * 1000,
  });

export default useCourses;
