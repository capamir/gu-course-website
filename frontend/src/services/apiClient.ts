import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
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
}

const authInstance = axios.create({
  baseURL: "http://localhost:8000/api",
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

// authInstance.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("user")!);

//     config.headers["Authorization"] = `Bearer ${user.access}`;
//     return config;
//   },
//   (error: Error) => Promise.reject(error)
// );

// authInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const user = JSON.parse(localStorage.getItem("user")!);

//     const config = error?.config;

//     if (error.response.status === 401) {
//       try {
//         const refreshResponseData = await refreshApiClient.post({
//           refresh: user.refresh,
//         });

//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...user, access: refreshResponseData.access })
//         );

//         config.headers[
//           "Authorization"
//         ] = `Bearer ${refreshResponseData.access}`;

//         return axiosInstance(config);
//       } catch (e) {
//         localStorage.removeItem("user");

//         window.location.replace("/auth/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );
