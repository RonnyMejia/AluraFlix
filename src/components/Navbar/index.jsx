import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle =
    "underline underline-offset-8 font-bold text-indigo-700 text-lg";

  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-6 px-8 top-0 bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 shadow-lg text-white">
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <span className="text-purple-300">Pixa</span>Photos
      </h1>

      {/* Menu */}
      <ul
        className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 lg:static lg:flex lg:flex-row lg:h-auto lg:p-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:text-yellow-300 text-lg"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:text-yellow-300 text-lg"
            }
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-posts"
            className={({ isActive }) =>
              `py-3 px-6 rounded-lg text-lg font-medium ${
                isActive
                  ? "bg-yellow-300 text-gray-900"
                  : "bg-white text-purple-600 hover:bg-yellow-300 hover:text-gray-900"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Create 
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="text-3xl z-30 lg:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <IoMdClose /> : <FaBarsStaggered />}
      </button>
    </nav>
  );
};

export default Navbar;
