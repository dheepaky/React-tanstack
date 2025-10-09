import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  //   const linkClass = ({ isActive }) => (isActive ? "font-bold underline" : "");

  return (
    <div className="bg-slate-200 flex justify-center p-5 gap-5">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "scale-110 font-semibold underline  transition-all duration-300  underline-offset-8 decoration-blue-500"
            : ""
        }>
        Home
      </NavLink>

      <NavLink
        to={"/create"}
        className={({ isActive }) =>
          isActive
            ? "scale-110 font-semibold underline  transition-all duration-300  decoration-blue-500 underline-offset-8"
            : ""
        }>
        Create
      </NavLink>
    </div>
  );
}
