import { LoginResponse } from "./Auth";
import { StoreCartItemType } from "./Cart";

export interface DataStoreType {
  bucket: StoreCartItemType[];
  cart_id: string;
  setCartId: (id: string) => void;
  clearCartId: () => void;
  setProduct: (product: StoreCartItemType) => void;
  removeProduct: (id: number) => void;
  updateProduct: (cart_id: number, product_id: number) => void;
  clearBucket: () => void;
}

export interface AuthStoreType {
  user: LoginResponse;
  login: (user: LoginResponse) => void;
  logout: () => void;
}
