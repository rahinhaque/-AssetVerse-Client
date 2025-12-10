import { createBrowserRouter } from "react-router";
import Rootlayouts from "../layouts/Rootlayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayouts,
  },
]);
