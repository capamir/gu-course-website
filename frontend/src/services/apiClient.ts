import axios from "axios";
import { RefreshTokenData } from "../types/Auth";

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

  post = (data: T) => {
    return authInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = (data: T) => {
    return authInstance.patch<T>(this.endpoint, data).then((res) => res.data);
  };
}

authInstance.interceptors.request.use(
  (config) => {
    const { state } = JSON.parse(localStorage.getItem("auth")!);
    config.headers["Authorization"] = `Bearer ${state.user.access}`;
    return config;
  },
  (error: Error) => Promise.reject(error)
);

const refreshApiClient = new APIClient<RefreshTokenData>("auth/token/refresh/");

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { state } = JSON.parse(localStorage.getItem("auth")!);
    const { user } = state;
    const config = error?.config;

    if (error.response.status === 401) {
      try {
        const refreshResponseData = await refreshApiClient.post({
          refresh: user.refresh,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...state,
            user: {
              ...user,
              access: refreshResponseData.access,
            },
          })
        );

        config.headers[
          "Authorization"
        ] = `Bearer ${refreshResponseData.access}`;

        return axiosInstance(config);
      } catch (e) {
        localStorage.removeItem("auth");
        window.location.replace("/auth/login");
      }
    }

    return Promise.reject(error);
  }
);
