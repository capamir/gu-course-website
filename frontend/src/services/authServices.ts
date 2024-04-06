import { LoginResponse, VerifyDataType } from "../types/Auth";
import { APIClient } from "./apiClient";

export const loginApiClient = new APIClient<LoginResponse>("auth/login/");
export const registerApiClient = new APIClient<LoginResponse>("auth/register/");
export const verifyApiClient = new APIClient<VerifyDataType>("auth/verify/");
