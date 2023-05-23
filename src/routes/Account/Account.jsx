import { Outlet, NavLink } from "react-router-dom";

const Account = () => {
  return (
    <div className="bg-[#181931] pt-20 w-full ">
      <div className="links-container bg-[#232345] pt-4 sm:pt-0 h-36 md:h-20 pl-10 sm:px-28  grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center md:gap-4 text-center sm:justify-around  sm:text-left">
        <NavLink
          to="/account/myaccount"
          className={({ isActive }) =>
            isActive ? "active-decoration " : "deactive-decoration"
          }
        >
          My Account
        </NavLink>
        <NavLink
          to="/account/mytransactions"
          className={({ isActive }) =>
            isActive ? "active-decoration " :"deactive-decoration"
          }
        >
          My Transactions
        </NavLink>
        <NavLink
          to="/account/liveevents"
          className={({ isActive }) =>
            isActive ? "active-decoration" :"deactive-decoration"
          }
        >
          Live Events
        </NavLink>
        <NavLink
          to="/account/closedevents"
          className={({ isActive }) =>
            isActive ? "active-decoration" : "deactive-decoration"
          }
        >
          Closed Events
        </NavLink>
        <NavLink
          to="/account/resolvedevents"
          className={({ isActive }) =>
            isActive ? "active-decoration" : "deactive-decoration"
          }
        >
          Resolved Events
        </NavLink>
        <NavLink
          to="/account/mytrade"
          className={({ isActive }) =>
            isActive ? "active-decoration" : "deactive-decoration"
          }
        >
          My Trade
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Account;
