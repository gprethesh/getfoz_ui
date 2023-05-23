import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { SessionContext } from "../components/SessionContext"; // Import the SessionContext

import { useEffect, useState, useContext } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  const { session, login, logout } = useContext(SessionContext);

  return (
    <nav className="w-full h-28 bg-[#232345] flex justify-between items-center px-3 lg:px-7">
      <h2 className="text-white">GetFoz</h2>
      <div className="links w-7/12 hidden md:flex justify-between">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active " : "text-white")}
        >
          Home
        </NavLink>
        <HashLink to="/#blockchain">Blockchain</HashLink>
        <HashLink to="/#opinions">Trade Opinions</HashLink>
        <HashLink to="/#faq">FAQ</HashLink>
        {session && <HashLink to="/account/myaccount">DashBoard</HashLink>}
      </div>

      {!session ? (
        <div
          className="text-base text-center pt-2 text-white rounded-xl font-normal bg-[#0055FF] w-[148px] h-[40px] absolute right-16 md:right-6 md:relative "
          onClick={login}
        >
          {" "}
          Login
        </div>
      ) : (
        <React.Fragment>
          <div
            className="text-base text-center pt-2 text-white rounded-xl font-normal bg-[#0055FF] w-[148px] h-[40px] absolute right-16 md:right-6 md:relative "
            onClick={logout}
          >
            {" "}
            Logout
          </div>
        </React.Fragment>
      )}

      <div className="hamburger-menu relative md:hidden inline-block ">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={handleMenuClick}
          className="hidden"
          id="menuToggle"
        />
        <label
          htmlFor="menuToggle"
          className={`block text-sm cursor-pointer ${
            isOpen && "relative z-20 "
          }`}
        >
          <span
            className={`block w-5 h-[3px] mb-[3px] ${
              isOpen
                ? "bg-gray-500 relative z-20 rotate-45 translate-y-[5px] transition-all"
                : "bg-white z-50 transition-all"
            }`}
          ></span>
          <span
            className={`block  w-5 h-[3px] mb-[3px] ${
              isOpen ? "transition-all hidden" : "bg-white z-50 transition-all"
            }`}
          ></span>
          <span
            className={`block  w-5 h-[3px] mb-1 ${
              isOpen
                ? "bg-gray-500 relative z-20 -rotate-45 -translate-y-[1px] transition-all "
                : "bg-white z-50 transition-all"
            }`}
          ></span>
        </label>
        <div
          className={`absolute flex flex-col -top-14 left-0 h-screen z-10 bg-white shadow-lg p-4 transition-all duration-300 ease-in-out ${
            isOpen ? "-translate-x-52 w-screen" : "translate-x-52"
          }`}
        >
          <NavLink
            to="/"
            className="my-2 text-gray-800 mt-16 font-medium hover:text-primary"
          >
            Home
          </NavLink>

          <HashLink
            to="/#blockchain"
            className="my-2 text-gray-800 font-medium hover:text-primary"
          >
            Blockchain
          </HashLink>
          <HashLink
            to="/#opinions"
            className="my-2 text-gray-800 font-medium hover:text-primary"
          >
            Trade Opinions
          </HashLink>

          <HashLink
            to="/#faq"
            className="my-2 text-gray-800 font-medium hover:text-primary"
          >
            Faq
          </HashLink>
          {session && (
            <HashLink
              to="/account/myaccount"
              className="my-2 text-gray-800 font-medium hover:text-primary"
            >
              DashBoard
            </HashLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
