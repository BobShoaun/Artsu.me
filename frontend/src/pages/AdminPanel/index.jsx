import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { setIsPublic } from "../../store/generalSlice";
import { useAuthentication } from "../../hooks/useAuthentication";
import Unauthorized from "../../components/Unauthorized";
import { apiUrl } from "../../config";
import axios from "axios";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { user, accessToken, redirectToLogin, isLoggedIn } = useAuthentication();
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const tagNameInput = useRef(null);
  const tagColor = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) redirectToLogin();
  }, [isLoggedIn, redirectToLogin]);

  //phase2: create method here for API call to update user information
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users`);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTags = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/tags`);
      setTags(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addTag = async (inputLabel, inputColor) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/tags`,
        {
          label: inputLabel,
          color: inputColor,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      tags.push(data);
      getTags();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
    getTags();
  }, []);

  useEffect(() => {
    dispatch(setIsPublic({ isPublic: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn && user.isAdmin) {
    return (
      <main className="dark:bg-gray-900">
        <Navbar />
        <div className="mx-auto mb-20 min-h-screen px-10 pt-20">
          <h1 className="dark:text-white text-2xl font-semibold text-center py-5">Admin Panel</h1>
          <table className="mx-auto table-auto border-white border-collapse border-2 px-10">
            <thead>
              <tr>
                <th className="text-white p-1 border-2">username</th>
                <th className="text-white p-1 border-2">name</th>
                <th className="text-white p-1 border-2">id</th>
                <th className="text-white p-1 border-2">avatarUrl</th>
                <th className="text-white p-1 border-2">isBanned</th>
                <th className="text-white p-1 border-2">isAdmin</th>
                <th className="text-white p-1 border-2">isFeatured</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    <Link
                      to={`/admin/${user._id}`}
                      key={user._id}
                      className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                    >
                      {user.username}
                    </Link>
                  </td>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    <Link
                      to={`/admin/${user._id}`}
                      key={user._id}
                      className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="dark:text-white text-lg text-center border-2 p-1">
                    <Link
                      to={`/admin/${user._id}`}
                      key={user.id}
                      className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                    >
                      {user._id}
                    </Link>
                  </td>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    <a
                      href={user.avatarUrl}
                      key={user.avatarUrl}
                      className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                    >
                      {user.avatarUrl}
                    </a>
                  </td>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    {user.isBanned.toString()}
                  </td>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    {user.isAdmin.toString()}
                  </td>
                  <td className="dark:text-white text-lg mr-3 text-center border-2 p-1">
                    {user.isFeatured.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="dark:text-white text-2xl font-semibold text-center py-5">Tags</h1>
          <div className="text-center mb-3 ">
            <form
              className="flex justify-center"
              onSubmit={e => {
                e.preventDefault();
                addTag(tagNameInput.current.value, tagColor.current.value);
              }}
            >
              <div className="w-32 mr-3">
                <input className="w-32" type="text" ref={tagNameInput}></input>
              </div>
              <input
                className="h-12 w-12 p-2 mr-3 cursor-pointer bg-transparent"
                type="color"
                ref={tagColor}
              />
              <button
                type="submit"
                className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 px-3 text-sm"
              >
                Add Tag
              </button>
            </form>
          </div>
          <table className="table-fixed border-white center border-collapse border-2 mx-auto">
            <thead>
              <tr>
                <th className="text-white p-1 w-64 border-2">label</th>
                <th className="text-white p-1 w-64 border-2">color</th>
                <th className="text-white p-1 w-64 border-2">id</th>
              </tr>
            </thead>
            <tbody>
              {tags.map(tag => (
                <tr key={user.id}>
                  <td className="dark:text-white text-lg mr-3 w-64 text-center border-2 p-1">
                    {tag.label}
                  </td>
                  <td
                    className="dark:text-white text-lg mr-3 w-64 text-center border-2 p-1"
                    style={{ color: tag.color }}
                  >
                    {tag.color}
                  </td>
                  <td className="dark:text-white text-lg mr-3 w-128 text-center border-2 p-1">
                    {tag._id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </main>
    );
  } else {
    return <Unauthorized />;
  }
};

export default AdminPanel;
