import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../types/Product";
import { ProductApiClient } from "../services/apiServices";

const useProducts = () =>
  useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: () => ProductApiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
  });

export default useProducts;
