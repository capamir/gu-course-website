import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../types/Product";
import { ProductApiClient } from "../services/apiServices";

const useProduct = (id: string) =>
  useQuery<ProductType, Error>({
    queryKey: ["products", id],
    queryFn: () => ProductApiClient.get(id),
    staleTime: 60 * 60 * 1000,
  });

export default useProduct;
