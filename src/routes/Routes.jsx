import { createBrowserRouter } from "react-router";
import Rootlayouts from "../layouts/Rootlayouts";
import Login from "../Auth/Login/Login";
import Error404 from "../Pages/Error/Error404";
import RegisterHR from "../Auth/RegisterHR/RegisterHR";
import EmployeeRegister from "../Auth/RegisterEmployee/EmployeeRegister";
import Home from "../Pages/Home/Home/Home";
import DashboardLayouts from "../layouts/DashboardLayouts";
import AssetList from "../Dashboard/Hr dashboard/AssetList";
import AddAsset from "../Dashboard/Hr dashboard/AddAsset";
import DashboardLayout from "../layouts/DashboardLayouts";
import AllRequests from "../Dashboard/Hr dashboard/AllRequests";
import EmployeeList from "../Dashboard/Hr dashboard/EmployeeList";
import UpgradePackage from "../Dashboard/Hr dashboard/UpgradePackage";
import HrProfile from "../Dashboard/Hr dashboard/HrProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
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
        Component: EmployeeRegister,
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "assets", element: <AssetList /> },
      { path: "assets/add", element: <AddAsset /> },
      {
        path: "/dashboard/requests",
        Component: AllRequests,
      },
      {
        path: "/dashboard/employees",
        Component: EmployeeList,
      },
      {
        path: "/dashboard/upgrade-package",
        Component: UpgradePackage,
      },
      {
        path: "/dashboard/profile",
        Component: HrProfile,
      },

      // Employee Paths
    ],
  },
]);
