import { createBrowserRouter } from "react-router";
import Rootlayouts from "../layouts/Rootlayouts";
import Login from "../Auth/Login/Login";
import Error404 from "../Pages/Error/Error404"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayouts,
    children: [
      {},
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "*", 
        Component : Error404,
      },
    ],
  },
]);
