import axios from "axios";
import { RefreshTokenData } from "../types/Auth";
import { useAuthStore } from "../store";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

export class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };
  get = (id: string) => {
    return axiosInstance
      .get<T>(this.endpoint + id + "/")
      .then((res) => res.data);
  };
  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
  delete = (id: number) => axiosInstance.delete<T>(this.endpoint + `${id}/`);
}

const authInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

export class AuthAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => authInstance.get<T[]>(this.endpoint).then((res) => res.data);

  post = (data: T) => {
    return authInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = (data: T) => {
    return authInstance.patch<T>(this.endpoint, data).then((res) => res.data);
  };
}

authInstance.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    config.headers["Authorization"] = `Bearer ${user.access}`;
    return config;
  },
  (error: Error) => Promise.reject(error)
);

// Create a function to refresh the token
async function refreshToken(data: { refresh: string }) {
  // Call your API endpoint to refresh the token
  const response = await axios.post<RefreshTokenData>(
    "auth/token/refresh/",
    data
  );
  // Assuming the new token is returned in the response
  return response.data.access;
}

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { user } = useAuthStore.getState();
    const config = error?.config;

    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken({
          refresh: user.refresh!,
        });

        // Update access token in Zustand global state
        useAuthStore.getState().refresh(newAccessToken);

        // Retry the original request with the new access token
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(config);
      } catch (e) {
        // Handle token refresh failure
        localStorage.removeItem("auth");
        window.location.replace("/auth/login");
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
