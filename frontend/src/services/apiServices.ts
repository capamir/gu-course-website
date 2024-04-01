import { ProductType } from "../types/Product";
import { APIClient } from "./apiClient";

export const ProductApiClient = new APIClient<ProductType>("store/products/");
