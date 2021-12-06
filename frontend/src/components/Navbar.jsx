import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect } from "react";
import { Search, Bell, Check } from "react-feather";
import { formatRelative } from "date-fns";
import "./index.css";

import axios from "axios";
import { apiUrl } from "../config";

const Navbar = ({ showSearchButtons }) => {
  const history = useHistory();
  const [accessToken, user, , _logout] = useAuthentication();
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);

  const logout = () => {
    _logout();
    history.push("/");
  };

  const searchValueOnChange = e => {
    setSearch(e.target.value);
  };

  const getMessages = async () => {
    if (!accessToken) return;
    const { data } = await axios.get(`${apiUrl}/users/${user._id}/messages/received`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(data);
    const messages = data
      .filter(m => !m.hasRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMessages(messages);
  };

  const readMessage = async messageId => {
    if (!accessToken) return;
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}/messages/${messageId}/remove`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(data);
    getMessages();
  };

  useEffect(getMessages, [accessToken]);

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
            <input className="" type="search" placeholder="Search" onChange={searchValueOnChange} />
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
        {accessToken ? (
          <>
            <li tabIndex={0} className="ml-auto notif-wrapper relative cursor-pointer">
              <Bell className="text-white" size={20} />

              {messages.length > 0 && (
                <>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-300 rounded-full animate-ping"></span>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </>
              )}

              <div className="notifications bg-gray-900 transition-opacity p-1 w-96 transform -translate-x-1/2 left-0 absolute border-2 border-gray-900 top-10 rounded-md">
                <h2 className="text-gray-100 text-sm font-medium p-2">Messages:</h2>
                {messages.length > 0 ? (
                  <main className="max-h-96 overflow-auto">
                    {messages.map(message => (
                      <div key={message._id} className="bg-gray-800 p-3 flex items-center m-2">
                        <div>
                          <div className="flex items-center gap-3 mb-3" key={message._id}>
                            <img
                              className="rounded-full w-8 h-8 object-cover"
                              src={message.sender.avatarUrl}
                              alt={message.sender.name}
                            />
                            <div>
                              <p className="text-gray-100 font-medium text-sm">
                                {message.sender.name}
                              </p>
                              <p className="text-gray-300 text-xs">
                                {formatRelative(new Date(message.createdAt), new Date())}
                              </p>
                            </div>
                          </div>
                          <h3 className="text-gray-100 text-sm">{message.subject}</h3>
                          <p className="text-gray-300 text-xs">{message.body}</p>
                        </div>
                        <button
                          onClick={() => readMessage(message._id)}
                          title="Mark as read"
                          className="ml-auto bg-gray-900 hover:bg-gray-700 rounded-full p-1.5"
                        >
                          <Check className="text-white" size={12} />
                        </button>
                      </div>
                    ))}
                  </main>
                ) : (
                  <main>
                    <h2 className="text-gray-100 text-center text-sm p-3 bg-gray-800">
                      You have no messages.
                    </h2>
                  </main>
                )}
              </div>
            </li>
            <li className="dropdown-wrapper relative text-white text-sm flex items-center gap-5">
              <p className="font-semibold">{user.name}</p>
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
              />
              <div className="dropdown opacity-0 backdrop-blur-sm backdrop-filter absolute py-1 right-0 bg-gray-900 rounded-sm">
                <ul>
                  <li>
                    <Link className="py-2 px-5 hover:bg-gray-800 transition block" to="/profile">
                      Profile
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
