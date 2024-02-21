import { Link, useHistory } from "react-router-dom";
// import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect, useCallback, useContext } from "react"; // removed useRef
import { Search, Bell } from "react-feather"; // removed Check
import MessagePanel from "./MessagePanel";
import "./index.css";

import axios from "axios";
import { defaultAvatarUrl } from "../config";
import { User, LogOut, Layout, Image, Users } from "react-feather";
import { AppContext } from "../App";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = ({ onSearch, searchInput }) => {
  const history = useHistory();
  // const { accessToken, isLoggedIn, user, logout: _logout } = useAuthentication();
  const [messages, setMessages] = useState([]);

  const { isLoggedIn, accessToken, user, logout: _logout } = useAuthentication();

  const logout = () => {
    _logout();
    history.push("/");
  };

  const getMessages = useCallback(async () => {
    if (!isLoggedIn) return;
    const { data } = await axios.get(`/users/${user._id}/messages/received`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const messages = data
      .filter(m => !m.hasRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(messages);
  }, [accessToken, user]);

  const readMessage = async messageId => {
    if (!isLoggedIn) return;
    await axios.patch(
      `/users/${user._id}/messages/${messageId}/remove`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    getMessages();
  };

  useEffect(() => {
    getMessages();
  }, [getMessages, accessToken, user]);

  return (
    <nav className=" bg-gray-800 bg-opacity-80 z-20 shadow-lg backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 h-16 flex">
      <ul className="flex items-center gap-5 container w-full m-auto">
        <li>
          <Link to="/" className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
        </li>
        <li className="ml-auto relative searchbox w-full max-w-xl">
          <form
            action=""
            onSubmit={e => {
              e.preventDefault();
              onSearch();
            }}
          >
            <input ref={searchInput} type="text" placeholder="Search" />
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
              <p className="font-semibold z-10">
                {user.name || `${user.givenName} ${user.familyName}`}
              </p>
              <img
                className="rounded-full w-10 h-10 object-cover z-10"
                src={user.avatarUrl || defaultAvatarUrl}
                onError={e => (e.target.src = defaultAvatarUrl)}
                alt={`${user.name} avatar`}
              />
              <div className="dropdown opacity-0 absolute py-1 right-0 bg-gray-900 rounded-sm">
                <ul>
                  <li>
                    <Link
                      className="py-2 px-5 flex items-center gap-2 hover:bg-gray-800 transition"
                      to="/profile"
                    >
                      <User size={15} /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="py-2 px-5 flex items-center gap-2 hover:bg-gray-800 transition"
                      to="/artworks"
                    >
                      <Image size={15} /> Artworks
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="py-2 px-5 flex items-center gap-2 hover:bg-gray-800 transition"
                      to={`/portfolio/${user.username}`}
                    >
                      <Layout size={15} /> Portfolio
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <li>
                      <Link
                        className="py-2 px-5 flex items-center gap-2 hover:bg-gray-800 transition"
                        to={`/admin`}
                      >
                        <Users size={15} /> Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      className="py-2 px-5 flex items-center gap-2 hover:bg-gray-800 transition w-full text-left"
                      onClick={logout}
                    >
                      <LogOut size={15} /> Logout
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
