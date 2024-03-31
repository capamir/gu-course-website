import { ProductType } from "../types/Courses";
import { APIClient } from "./apiClient";

export const ProductApiClient = new APIClient<ProductType>("/products");
