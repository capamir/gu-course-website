import { createBrowserRouter } from "react-router-dom";
import { Layout, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
