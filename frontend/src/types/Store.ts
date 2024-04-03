import { LoginResponse } from "./Auth";
import { StoreCartItemType } from "./Cart";

export interface DataStoreType {
  bucket: StoreCartItemType[];
  setProduct: (product: StoreCartItemType) => void;
  removeProduct: (id: number) => void;
  clearBucket: () => void;
}

export interface AuthStoreType {
  user: LoginResponse;
  login: (user: LoginResponse) => void;
  logout: () => void;
}
