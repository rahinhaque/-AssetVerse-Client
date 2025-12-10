import { createBrowserRouter } from "react-router";
import Rootlayouts from "../layouts/Rootlayouts";
import Login from "../Auth/Login/Login";
import Error404 from "../Pages/Error/Error404"
import RegisterHR from "../Auth/RegisterHR/RegisterHR";
import EmployeeRegister from "../Auth/RegisterEmployee/EmployeeRegister";

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
        path: "/register/hr",
        Component: RegisterHR,
      },
      {
        path: "/register/employee",
        Component: EmployeeRegister
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },
]);
