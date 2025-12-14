import { Link } from "react-router-dom"; // <-- Fixed: Changed from "react-router" to "react-router-dom"
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const hrDropdown = [
    { name: "Asset List", path: "/dashboard/assets" },
    { name: "Add Asset", path: "/dashboard/assets/add" },
    { name: "All Requests", path: "/dashboard/requests" },
    { name: "Employee List", path: "/dashboard/employees" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Logout", action: logout },
  ];

  const employeeDropdown = [
    { name: "My Assets", path: "/dashboard/my-assets" }, // <-- Fixed: Added /dashboard prefix
    { name: "My Team", path: "/dashboard/my-team" }, // <-- Fixed: Added /dashboard prefix
    { name: "Request Asset", path: "/dashboard/request-asset" }, // <-- Fixed: Added /dashboard prefix
    { name: "Profile", path: "/dashboard/employee-profile" }, // <-- Fixed: Added /dashboard prefix
    { name: "Logout", action: logout },
  ];

  const menuItems =
    user?.role === "hr"
      ? hrDropdown
      : user?.role === "employee"
      ? employeeDropdown
      : [];

  const dropdownLabel =
    user?.role === "hr"
      ? "HR Manager"
      : user?.role === "employee"
      ? "Employee"
      : "";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Asset<span className="text-primary">Verse</span>
        </Link>
      </div>

      {/* Always show About Us and Contact links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link> {/* Added: About Us link */}
          </li>
          <li>
            <Link to="/contact">Contact</Link> {/* Added: Contact link */}
          </li>
        </ul>
      </div>

      {/* Show Dashboard button for logged-in users */}
      {user && (
        <div className="navbar-center lg:navbar-item hidden lg:flex">
          <Link to="/dashboard" className="btn btn-outline btn-sm">
            Dashboard
          </Link>
        </div>
      )}

      {/* Guest menu items (when not logged in) */}
      {!user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">
            <li>
              <Link to="/register/employee">Join as Employee</Link>
            </li>
            <li>
              <Link to="/register/hr">Join as HR Manager</Link>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="cursor-pointer font-semibold flex items-center gap-1"
              >
                {dropdownLabel} <span className="text-sm">▼</span>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
              >
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    {item.action ? (
                      <button onClick={item.action}>{item.name}</button>
                    ) : (
                      <Link to={item.path}>{item.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                />
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
