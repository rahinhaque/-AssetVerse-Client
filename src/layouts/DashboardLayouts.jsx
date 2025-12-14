// src/layouts/DashboardLayouts.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import { MdAdd, MdList, MdPeople, MdDashboard, MdHome } from "react-icons/md";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ... your hrMenu and employeeMenu stay the same (relative paths)
  const hrMenu = [
    { name: "Asset List", path: "/dashboard/assets", icon: <MdList /> },
    { name: "Add Asset", path: "/dashboard/assets/add", icon: <MdAdd /> },
    {
      name: "All Requests",
      path: "/dashboard/requests",
      icon: <MdDashboard />,
    },
    { name: "Employee List", path: "/dashboard/employees", icon: <MdPeople /> },
    {
      name: "Upgrade Package",
      path: "/dashboard/upgrade-package",
      icon: <MdDashboard />,
    },
    { name: "Profile", path: "/dashboard/profile", icon: <MdDashboard /> },
  ];

  const employeeMenu = [
    { name: "My Assets", path: "/dashboard/my-assets", icon: <MdList /> },
    {
      name: "Request Asset",
      path: "/dashboard/request-asset",
      icon: <MdAdd />,
    },
    { name: "My Team", path: "/dashboard/my-team", icon: <MdPeople /> },
    {
      name: "Profile",
      path: "/dashboard/employee-profile",
      icon: <MdDashboard />,
    },
  ];


  const menu = user?.role === "hr" ? hrMenu : employeeMenu;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content area - THIS MUST CONTAIN THE OUTLET */}
      <div className="drawer-content flex flex-col">
        {/* Mobile menu button */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden fixed top-4 left-4 z-50"
        >
          Menu
        </label>

        {/* Actual page content from child routes */}
        <div className="flex-1 p-4 lg:p-8 bg-base-200 overflow-y-auto">
          <Outlet />{" "}
          {/* <-- This is where your MyAssets, AssetList, etc. render */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
          {/* User info */}
          <div className="flex items-center gap-3 mb-8 p-4 border-b">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold">{user?.name || "User"}</h2>
              <p className="text-xs opacity-60 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Home link */}
          <li>
            <Link to="/">
              <MdHome /> Home
            </Link>
          </li>

          {/* Role-based menu */}
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path}>
                {item.icon} {item.name}
              </Link>
            </li>
          ))}

          {/* Logout */}
          <li className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-error font-semibold"
            >
              <FiLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
