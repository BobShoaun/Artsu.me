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
        <div className="container mx-auto py-20">
          <section className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-7">
            {users.map(user => (
                <Link
                    //change to a user admin panel
                    to={`/admin/${user.username}`}
                    key={user.id}
                    className={`mx-auto hover:bg-gray-800 rounded-lg transition-all p-5 cursor-pointer`}
                >
                  <div className="mb-2 p-3">
                    <img
                        style={{ maxWidth: "12em" }}
                        className="shadow-lg rounded-lg"
                        src={user.avatar}
                        alt={`${user.name} avatar`}
                    />
                  </div>
                  <h2 className="dark:text-white font-semibold text-lg">
                    {user.name}
                  </h2>
                </Link>
            ))}
          </section>
        </div>
        <Footer />
      </main>
  );
};


export default AdminPanel;
