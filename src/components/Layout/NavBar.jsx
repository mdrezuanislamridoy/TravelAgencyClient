/* eslint-disable react/prop-types */
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { context } from "../../context/UserContext";
import { useContext, useState } from "react";
import MessageButton from "../ui/MessageButton";
import AiChat from "../ui/AiChat";

export default function NavBar() {
  const { user } = useContext(context);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleNav = () => {
    const nav = document.getElementById("navbar-default");
    if (nav) {
      nav.classList.toggle("hidden");
    }
  };

  const closeNav = () => {
    const nav = document.getElementById("navbar-default");
    if (nav && !nav.classList.contains("hidden")) {
      nav.classList.add("hidden");
    }
  };

  const handleNavClick = (path) => {
    setActiveLink(path);
    navigate(path);
    closeNav();
  };

  return (
    <nav className=" border-gray-200 bg-white dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={handleNav}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link
          onClick={closeNav}
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            RRTravel
          </span>
        </Link>
        <MessageButton />

        <div
          className="hidden md:flex w-full md:w-auto md:items-center"
          id="navbar-default"
        >
          <div className="md:flex md:flex-row-reverse">
            <div
              className="flex md:ml-4 md:items-center md:justify-center md:mb-0 mb-4 cursor-pointer py-2"
              onClick={() => handleNavClick("/profile")}
            >
              {user.profilePicture ? (
                <img src={user.profile} />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-4xl text-center extra-bg-color w-14 h-14 py-2 rounded-full mr-3 md:w-10 md:h-10 md:text-2xl"
                />
              )}
              <div>
                <span className="text-white text-center md:hidden text-2xl">
                  {user.name}
                </span>
                <br />
                <span className="text-gray-400 text-center md:hidden">
                  {user.role}
                </span>
              </div>
            </div>
            <ul className="font-medium md:flex-row flex flex-col md:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    onClick={() => handleNavClick(link.path)}
                    to={link.path}
                    className={`block py-2 px-3 rounded-sm ${
                      activeLink === link.path
                        ? "bg-blue-700 text-white"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AiChat />
    </nav>
  );
}
