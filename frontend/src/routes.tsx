import { createBrowserRouter } from "react-router-dom";
import { Layout, Home, Details } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":id", element: <Details /> },
    ],
  },
]);

export default router;
