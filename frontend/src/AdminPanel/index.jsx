import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { users } from "../users.json";

import { Link, useParams } from "react-router-dom";

import { tags } from "../tags.json";
import { artworks } from "../artworks.json";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setIsPublic} from "../store/generalSlice";
import {useScrollToTop} from "../hooks/useScrollToTop";

const AdminPanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsPublic({ isPublic: false }));
  }, []);

  useScrollToTop();

  return (
      <main className="dark:bg-gray-900">
        <Navbar />
          <h1 className="dark:text-white text-2xl font-semibold text-center py-5">Admin Panel</h1>
        <div className="container mx-auto flex-none mb-20 min-h-screen">
            <table className="table-fixed border-white center border-collapse border-2 mx-auto">
                <thead>
                    <tr>
                        <th className="text-white p-1 w-64 border-2">
                            username
                        </th>
                        <th className="text-white p-1 w-64 border-2">
                            name
                        </th>
                        <th className="text-white p-1 w-128 border-2">
                            email
                        </th>
                        <th className="text-white p-1 w-32 border-2">
                            id
                        </th>
                        <th className="text-white p-1 w-32 border-2">
                            is banned
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr>
                                <td className="dark:text-white text-lg mr-3 w-64 text-center border-2 p-1">
                                    <Link
                                        to={`/admin/${user.username}`}
                                        key={user.id}
                                        className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                                    >
                                    {user.username}
                                    </Link>
                                </td>
                                <td className="dark:text-white text-lg mr-3 w-64 text-center border-2 p-1">
                                    <Link
                                        to={`/admin/${user.username}`}
                                        key={user.id}
                                        className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                                    >
                                   {user.name}
                                    </Link>
                                </td>
                            <td className="dark:text-white text-lg mr-3 w-128 text-center border-2 p-1">
                                <Link
                                    to={`/admin/${user.username}`}
                                    key={user.id}
                                    className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                                >
                                    {user.email}
                                </Link>
                            </td>
                            <td className="dark:text-white text-lg mr-3 w-32 text-center border-2 p-1">
                                <Link
                                    to={`/admin/${user.username}`}
                                    key={user.id}
                                    className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
                                >
                                    {user.id}
                                </Link>
                            </td>
                            <td className="dark:text-white text-lg mr-3 w-32 text-center border-2 p-1">
                                {user.isBanned.toString()}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer />
      </main>
  );
};


export default AdminPanel;
