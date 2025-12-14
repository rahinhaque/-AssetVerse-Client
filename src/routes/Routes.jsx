import { createBrowserRouter, Navigate } from "react-router-dom"; // <-- Changed to react-router-dom
import DashboardLayout from "../layouts/DashboardLayouts";

import AssetList from "../Dashboard/Hr dashboard/AssetList";
import AddAsset from "../Dashboard/Hr dashboard/AddAsset";
import AllRequests from "../Dashboard/Hr dashboard/AllRequests";
import EmployeeList from "../Dashboard/Hr dashboard/EmployeeList";
import UpgradePackage from "../Dashboard/Hr dashboard/UpgradePackage";
import HrProfile from "../Dashboard/Hr dashboard/HrProfile";

// Employee pages
import MyAssets from "../Dashboard/Employee Dashboard/MyAssets";
import RequestAsset from "../Dashboard/Employee Dashboard/RequestAsset";
import MyTeam from "../Dashboard/Employee Dashboard/MyTeam";
import EmployeeProfile from "../Dashboard/Employee Dashboard/Profile";

// Root / login / home etc.
import Rootlayouts from "../layouts/Rootlayouts";
import Home from "../Pages/Home/Home/Home";
import Login from "../Auth/Login/Login";
import RegisterHR from "../Auth/RegisterHR/RegisterHR";
import EmployeeRegister from "../Auth/RegisterEmployee/EmployeeRegister";
import Error404 from "../Pages/Error/Error404";
import DynamicDashboard from "../Dashboard/DynamicDashboard";
import About from "../Pages/Home/About/About";
import Contact from "../Pages/Home/Conact/Contact";


export const router = createBrowserRouter([
  // Add these to your root routes children array
  {
    path: "/",
    element: <Rootlayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register/hr", element: <RegisterHR /> },
      { path: "register/employee", element: <EmployeeRegister /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <Error404 /> },
    ],
  },
  {
    path: "/dashboard/*", // <-- Keep the /*
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DynamicDashboard /> },
      // HR routes
      { path: "assets", element: <AssetList /> },
      { path: "assets/add", element: <AddAsset /> },
      { path: "requests", element: <AllRequests /> },
      { path: "employees", element: <EmployeeList /> },
      { path: "upgrade-package", element: <UpgradePackage /> },
      { path: "profile", element: <HrProfile /> },
      // Employee routes
      { path: "my-assets", element: <MyAssets /> },
      { path: "request-asset", element: <RequestAsset /> },
      { path: "my-team", element: <MyTeam /> },
      { path: "employee-profile", element: <EmployeeProfile /> },
      // <-- Add this to catch any unknown dashboard sub-paths (optional but good practice)
      { path: "*", element: <Navigate to="." replace /> }, // Or <Error404 /> if you want
    ],
  },
]);
