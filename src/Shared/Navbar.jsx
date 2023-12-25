import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "../Component/DarkMode/DarkModeToggle";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navItems = (
    <div className="font-semibold lg:flex">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/community">User Community</NavLink>
      </li>
      {!user ? (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <button onClick={handleLogOut} className="">
              LogOut
            </button>
          </li>
        </>
      )}
    </div>
  );

  return (
    <div className="navbar fixed bg-white">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="text-xs md:text-xl text-wrap">
          TaskQuest.com
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
          {user && (
            <div className="flex items-center justify-center gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 ring rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box  bg-base-200 md:hidden">
                  <li>{user.displayName}</li>
                  <li>{user.email}</li>
                </ul>
              </div>
              <div className="font-semibold hidden md:block">
                <p>{user.displayName}</p>
                <p>{user.email}</p>
              </div>
            </div>
          )}
        </div>
        <DarkModeToggle></DarkModeToggle>
    </div>
  );
};

export default Navbar;
