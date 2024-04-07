import { useDataStore } from "../store";
import { AddCartItemType } from "../types/Cart";
import { OrderType } from "../types/Order";
import { ProductType } from "../types/Product";
import { APIClient, AuthAPIClient } from "./apiClient";

export const ProductApiClient = new APIClient<ProductType>("store/products/");

export const CartItemApiClient = () => {
  const cart_id = useDataStore((s) => s.cart_id);
  return new APIClient<AddCartItemType>(`store/carts/${cart_id}/items/`);
};

export const CreateOrderApiClient = new AuthAPIClient<OrderType>(
  `store/orders/`
);
export const UpdateOrderApiClient = () => {
  const { id } = useDataStore((s) => s.order);
  return new AuthAPIClient<OrderType>(`store/orders/${id}/`);
};
