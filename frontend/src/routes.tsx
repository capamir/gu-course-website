import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Details,
  Bucket,
  Login,
  Signup,
  LoginPhone,
  VerifyCode,
  Profile,
} from "./pages";
import { Auth, Main } from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
  { path: "/profile", element: <Profile /> },
]);

export default router;
