import { ProductType } from "./Courses";

export interface DataStoreType {
  bucket: ProductType[];
  setProduct: (product: ProductType) => void;
  clearBucket: () => void;
}
