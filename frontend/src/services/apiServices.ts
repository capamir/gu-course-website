import { useDataStore } from "../store";
import { AddCartItemType } from "../types/Cart";
import { ProductType } from "../types/Product";
import { APIClient } from "./apiClient";

export const ProductApiClient = new APIClient<ProductType>("store/products/");

export const CartItemApiClient = () => {
  const cart_id = useDataStore((s) => s.cart_id);
  return new APIClient<AddCartItemType>(`store/carts/${cart_id}/items/`);
};
