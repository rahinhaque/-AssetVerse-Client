import { createBrowserRouter } from "react-router";
import Rootlayouts from "../layouts/Rootlayouts";
import Login from "../Auth/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayouts,
    children: [
      {

      },
      {
        path: "/login",
        Component: Login
      }
    ]
  },
]);
