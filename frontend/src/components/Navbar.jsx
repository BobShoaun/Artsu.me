import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState } from "react";
import { Search } from "react-feather";
import "./index.css";

const Navbar = ({ showSearchButtons }) => {
  const history = useHistory();
  const [jwt, user, , _logout] = useAuthentication();
  const [search, setSearch] = useState("");

  const logout = () => {
    _logout();
    history.push("/");
  };

  const searchValueOnChange = e => {
    setSearch(e.target.value);
  };

  return (
    <nav className=" bg-gray-800 bg-opacity-50 z-20 py-5 shadow-lg backdrop-filter backdrop-blur-sm sticky top-0">
      <ul className="flex items-center gap-8 container mx-auto">
        <li>
          <Link to="/" className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
        </li>
        <li className="ml-auto relative searchbox">
          <form
            action=""
            onSubmit={e => {
              e.preventDefault();
              history.push("/search");
            }}
          >
            <input
              className=""
              type="search"
              placeholder="Search"
              onChange={searchValueOnChange}
            />
          </form>

          {showSearchButtons && (
            <div className="w-full text-center">
              <button
                className="float-right whitespace-nowrap flex-nowrap mr-2 text-xs px-2 py-1 mt-1 bg-gray-500 rounded-full hover:bg-coolGray-400"
                type="submit"
              >
                <Link to={`/search/&art=${search}`}>search artwork</Link>
              </button>
              <button
                className="float-right whitespace-nowrap flex-nowrap mr-2 text-xs px-2 py-1 mt-1 bg-gray-500 rounded-full hover:bg-coolGray-400"
                type="submit"
              >
                <Link to={`/search/&usr=${search}`}>search artist</Link>
              </button>
            </div>
          )}
          <Search
            size={18}
            className="searchbox-icon text-gray-200 opacity-50 absolute right-2 top-1 transition"
          />
        </li>
        {jwt ? (
          <li className="dropdown-wrapper ml-auto relative text-white text-sm flex items-center gap-5">
            <p className="font-semibold">{user.name}</p>
            <img
              className="rounded-full w-10 h-10"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
            <div className="dropdown opacity-0 backdrop-blur-sm backdrop-filter absolute py-1 right-0 bg-gray-900 rounded-sm">
              <ul>
                <li className="py-2 px-5 hover:bg-gray-800 transition">
                  <Link to={`/profile/${user.username}`}>Profile</Link>
                </li>
                <li className="py-2 px-5 hover:bg-gray-800 transition">
                  <Link to={`/portfolio/${user.username}`}>Portfolio</Link>
                </li>
                {user.isAdmin && (
                  <li className="py-2 px-5 hover:bg-gray-800 transition">
                    <Link to={`/admin`}>Admin Panel</Link>
                  </li>
                )}
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
                className="text-gray-900 font-semibold bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="underline-offset text-gray-200 text-sm hover:underline font-semibold"
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
