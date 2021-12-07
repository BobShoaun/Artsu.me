import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect, useRef } from "react";
import { Search, Bell } from "react-feather"; // removed Check
import MessagePanel from "./MessagePanel";
import "./index.css";

import axios from "axios";
import { apiUrl } from "../config";

const Navbar = ({ onSearch, searchInput }) => {
  const history = useHistory();
  const { accessToken, isLoggedIn, user, logout: _logout } = useAuthentication();
  const [messages, setMessages] = useState([]);

  const logout = () => {
    _logout();
    history.push("/");
  };

  const getMessages = async () => {
    if (!isLoggedIn) return;
    const { data } = await axios.get(`${apiUrl}/users/${user._id}/messages/received`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const messages = data
      .filter(m => !m.hasRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(messages);
  };

  const readMessage = async messageId => {
    if (!isLoggedIn) return;
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}/messages/${messageId}/remove`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    getMessages();
  };

  useEffect(() => {
    getMessages();
  }, [isLoggedIn]);

  return (
    <nav className=" bg-gray-800 bg-opacity-80 z-20 py-5 shadow-lg backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0">
      <ul className="flex items-center gap-4 container mx-auto">
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
              onSearch();
            }}
          >
            <input ref={searchInput} className="w-96" type="text" placeholder="Search" />
          </form>

          <Search
            size={18}
            className="searchbox-icon text-gray-200 opacity-50 absolute right-2 top-1 transition"
          />
        </li>
        {accessToken ? (
          <>
            <li
              tabIndex={0}
              className="ml-auto hover:bg-gray-700 hover:bg-opacity-50 rounded-full p-2 notif-wrapper relative cursor-pointer"
            >
              <Bell className="text-white rounded-full" size={20} />

              {messages.length > 0 && (
                <>
                  <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-300 rounded-full animate-ping"></span>
                  <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </>
              )}

              <MessagePanel messages={messages} onReadMessage={readMessage} />
            </li>
            <li className="dropdown-wrapper relative text-white text-sm flex items-center gap-5">
              <p className="font-semibold z-10">{user.name}</p>
              <img
                className="rounded-full w-10 h-10 object-cover z-10"
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
              />
              <div className="dropdown opacity-0 absolute py-1 right-0 bg-gray-900 rounded-sm">
                <ul>
                  <li>
                    <Link className="py-2 px-5 hover:bg-gray-800 transition block" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="py-2 px-5 hover:bg-gray-800 transition block" to="/artworks">
                      Artworks
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="py-2 px-5 hover:bg-gray-800 transition block"
                      to={`/portfolio/${user.username}`}
                    >
                      Portfolio
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <li>
                      <Link className="py-2 px-5 hover:bg-gray-800 transition block" to={`/admin`}>
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      className="py-2 px-5 hover:bg-gray-800 transition block w-full text-left"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="ml-auto">
              <Link
                to="/register"
                className="text-gray-900 font-semibold bg-gradient-to-br from-rose-300 to-rose-500 rounded-sm hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="underline-offset ml-2 text-gray-200 text-sm hover:underline font-semibold"
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
