import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  Home,
  Details,
  Bucket,
  Login,
  Signup,
  LoginPhone,
  VerifyCode,
} from "./pages";
import Auth from "./components/layout/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":id", element: <Details /> },
      { path: "cart", element: <Bucket /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <LoginPhone /> },
      { path: "verify", element: <VerifyCode /> },
    ],
  },
]);

export default router;
