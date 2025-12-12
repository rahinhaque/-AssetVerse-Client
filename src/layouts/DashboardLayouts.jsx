import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import {
  MdAssignment,
  MdAdd,
  MdList,
  MdPeople,
  MdDashboard,
} from "react-icons/md";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const hrMenu = [
    { name: "Asset List", path: "/dashboard/assets", icon: <MdList /> },
    { name: "Add Asset", path: "/dashboard/assets/add", icon: <MdAdd /> },
    {
      name: "All Requests",
      path: "/dashboard/requests",
      icon: <MdAssignment />,
    },
    { name: "Employee List", path: "/dashboard/employees", icon: <MdPeople /> },
    { name: "Profile", path: "/dashboard/profile", icon: <MdDashboard /> },
  ];

  const employeeMenu = [
    { name: "My Assets", path: "/dashboard/my-assets", icon: <MdList /> },
    { name: "My Team", path: "/dashboard/my-team", icon: <MdPeople /> },
    {
      name: "Request Asset",
      path: "/dashboard/request-asset",
      icon: <MdAdd />,
    },
    { name: "Profile", path: "/dashboard/profile", icon: <MdDashboard /> },
  ];

  const menu = user?.role === "hr" ? hrMenu : employeeMenu;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col p-4 bg-base-200 min-h-screen">
        {/* MOBILE MENU BUTTON */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden w-fit mb-4"
        >
          Menu
        </label>

        {/* PAGE CONTENT */}
        <Outlet />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          {/* USER HEADER */}
          <div className="flex items-center gap-3 mb-4 p-2 border-b">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold">{user?.name}</h2>
              <p className="text-xs opacity-60 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* DYNAMIC LINKS */}
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          {/* LOGOUT */}
          <li className="mt-2">
            <button
              onClick={logout}
              className="flex items-center gap-2 text-error font-semibold"
            >
              <FiLogOut />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
