import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import React, { useState } from 'react';

const Navbar = () => {
  const history = useHistory();
  const [jwt, user, , _logout] = useAuthentication();
  const [search, setSearch] = useState("");

  const logout = () => {
    _logout();
    history.push("/");
  };

  const searchValueOnChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <nav className=" bg-gray-800 bg-opacity-50 z-20 py-5 shadow-lg backdrop-filter backdrop-blur-sm sticky top-0">
      <ul className="flex items-center gap-8 container mx-auto">
        <li>
          <Link to="/" className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
        </li>
        <li className="ml-auto">
          
          <div className="relative">
            <input
              className="px-2 py-1 w-100% min-w-full outline-none text-white bg-transparent border-opacity-50 
              focus:border-opacity-100 border-gray-200 pr-20"
              type="text"
              placeholder="search"
              style={{ borderBottomWidth: "1px" }}
              onChange={searchValueOnChange}
            />
            <button className="absolute w-20 py-1 bg-gray-500 rounded-full hover:bg-coolGray-400" 
              type="submit">
                <Link to={`/search/${search}`}>search</Link>
            </button>
          </div>
        </li>
        {jwt ? (
          <li className="dropdown-wrapper ml-auto relative text-white text-sm flex items-center gap-5">
            <p className="font-semibold">{user.username}</p>
            <img
              className="rounded-full w-10"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
            <div
              className="dropdown opacity-0 backdrop-blur-sm backdrop-filter absolute py-1 right-0 bg-gray-900 rounded-sm"
              style={{ top: "120%" }}
            >
              <ul>
                <li className="py-2 px-5 hover:bg-gray-800 transition">
                  <Link to={`/profile/${user.username}`}>Profile</Link>
                </li>
                <li className="py-2 px-5 hover:bg-gray-800 transition">
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <>
            <li className="ml-auto">
              <Link
                to="/register"
                className=" text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
                style={{ textUnderlineOffset: "3px" }}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-200 text-sm hover:underline font-semibold"
                style={{ textUnderlineOffset: "3px" }}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
