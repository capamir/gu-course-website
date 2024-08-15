import { useDataStore } from "../store";
import { AddCartItemType } from "../types/Cart";
import { OrderType } from "../types/Order";
import { ProductType } from "../types/Product";
import { ReviewType } from "../types/Review";
import { APIClient, AuthAPIClient } from "./apiClient";

export const ProductApiClient = new APIClient<ProductType>("store/products/");

export const ReviewApiClient = (Product_id: string) => {
  return new APIClient<ReviewType>(`store/products/${Product_id}/reviews/`);
};

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

export const CoursesApiClient = new AuthAPIClient<OrderType>(`store/courses/`);
