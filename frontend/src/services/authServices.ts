import { LoginResponse } from "../types/Auth";
import { APIClient } from "./apiClient";

export const loginApiClient = new APIClient<LoginResponse>("auth/login/");
