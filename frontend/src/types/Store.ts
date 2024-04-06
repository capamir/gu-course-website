import { LoginResponse } from "./Auth";
import { StoreCartItemType } from "./Cart";
import { OrderType } from "./Order";

export interface DataStoreType {
  bucket: StoreCartItemType[];
  setProduct: (product: StoreCartItemType) => void;
  removeProduct: (id: number) => void;
  updateProduct: (cart_id: number, product_id: number) => void;
  clearBucket: () => void;

  cart_id: string;
  setCartId: (id: string) => void;
  clearCartId: () => void;

  order: OrderType;
  setOrder: (order: OrderType) => void;
}

export interface AuthStoreType {
  user: LoginResponse;
  login: (user: LoginResponse) => void;
  logout: () => void;
  refresh: (access: string) => void;
  phone_number: string;
  setPhoneNumber: (phone_number: string) => void;
  clearPhoneNumber: () => void;
}
