import { useMutation } from "@tanstack/react-query";
import { CartItemApiClient } from "../services/apiServices";

export const useAddCartItem = () => {
  const apiClient = CartItemApiClient();

  return useMutation({
    mutationFn: apiClient.post,
  });
};
