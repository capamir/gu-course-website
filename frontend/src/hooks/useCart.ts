import { useMutation } from "@tanstack/react-query";
import { CartItemApiClient } from "../services/apiServices";
import { useDataStore } from "../store";

export const useAddCartItem = () => {
  const apiClient = CartItemApiClient();
  const updateProduct = useDataStore((s) => s.updateProduct);

  return useMutation({
    mutationFn: apiClient.post,
    onSuccess(savedItem) {
      updateProduct(savedItem.id!, savedItem.product_id);
    },
  });
};

export const useRemoveCartItem = () => {
  const apiClient = CartItemApiClient();

  return useMutation({
    mutationFn: apiClient.delete,
  });
};
