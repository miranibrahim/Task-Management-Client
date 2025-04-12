import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-cyan-400 font-semibold"
              : "text-gray-300 hover:text-cyan-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-cyan-400 font-semibold"
              : "text-gray-300 hover:text-cyan-300"
          }
        >
          Dashboard
        </NavLink>
      </li>
      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-300 hover:text-cyan-300"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-300 hover:text-cyan-300"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <button onClick={handleLogOut} className="text-gray-300 hover:text-red-400">
            Log Out
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar lg:fixed bg-[#0a192f] text-white px-4 shadow-lg">
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyan-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-cyan-400"
        >
          TaskQuest
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 space-x-3">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user && (
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-cyan-400">
                  <img src={user.photoURL} alt="User" />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3  rounded-box w-52 bg-[#0a192f]"
              >
                <li className="text-sm font-semibold text-cyan-300">
                {user.displayName}</li>
                <li className="text-xs text-gray-400">{user.email}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
