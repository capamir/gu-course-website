import { LoginResponse } from "./Auth";
import { ProductType } from "./Courses";

export interface DataStoreType {
  bucket: ProductType[];
  setProduct: (product: ProductType) => void;
  clearBucket: () => void;
}

export interface AuthStoreType {
  user: LoginResponse;
  login: (user: LoginResponse) => void;
  logout: () => void;
}
