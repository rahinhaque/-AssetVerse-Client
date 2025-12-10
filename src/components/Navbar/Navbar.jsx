import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "font-medium hover:text-primary";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8">

      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Asset<span className="text-primary">Verse</span>
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register/employee" className={navLinkClass}>
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/register/hr" className={navLinkClass}>
              Join as HR Manager
            </NavLink>
          </li>
        </ul>
      </div>

    
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register/employee">Join as Employee</Link>
            </li>
            <li>
              <Link to="/register/hr">Join as HR Manager</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
