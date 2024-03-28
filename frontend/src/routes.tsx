import { createBrowserRouter } from "react-router-dom";
import { Layout, Home, Details, Bucket } from "./pages";

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
]);

export default router;
