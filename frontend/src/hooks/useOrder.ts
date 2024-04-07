import { useNavigate } from "react-router-dom";
import {
  CreateOrderApiClient,
  UpdateOrderApiClient,
} from "../services/apiServices";
import { useMutation } from "@tanstack/react-query";
import { OrderType } from "../types/Order";
import { useDataStore } from "../store";

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const setOrder = useDataStore((s) => s.setOrder);
  const clearBucket = useDataStore((s) => s.clearBucket);
  const clearCartId = useDataStore((s) => s.clearCartId);

  return useMutation<OrderType, Error, OrderType>({
    mutationFn: CreateOrderApiClient.post,
    onSuccess: (newOrder: OrderType) => {
      setOrder(newOrder);
      clearBucket();
      clearCartId();
      navigate("/profile?tab=orders");
    },
  });
};

export const useUpdateOrder = () => {
  const navigate = useNavigate();
  const apiClient = UpdateOrderApiClient();
  const clearOrder = useDataStore((s) => s.clearOrder);
  return useMutation<OrderType, Error, OrderType>({
    mutationFn: apiClient.patch,
    onSuccess: () => {
      clearOrder();
      navigate("/profile?tab=courses");
    },
  });
};
