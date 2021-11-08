import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { users } from "../users.json";
import { Link } from "react-router-dom";
import { tags } from "../tags.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsPublic } from "../store/generalSlice";
import { useScrollToTop } from "../hooks/useScrollToTop";
import "./index.css";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsPublic({ isPublic: false }));
  }, []);

  useScrollToTop();

  return (
    <main className="dark:bg-gray-900">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 container flex">
          <div className="my-auto pl-5 bg-opacity-10 backdrop-filter backdrop-blur-sm p-5">
            <h1 className="text-white text-5xl font-bold">Discover</h1>
            <p className="text-white text-xl">talented artists</p>
          </div>
        </div>
        <img
          className="max-h-72 object-cover w-full"
          src="https://www.juegostudio.com/wp-content/uploads/2016/11/lowPoly-art-img-5.jpg"
          alt="low poly lion"
        />
      </div>
      <div className="container mx-auto py-20">
        <aside className="mb-10 mx-10">
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <p
                key={tag.id}
                className={`text-gray-900 -text-white cursor-pointer font-semibold text-sm  bg-${tag.color} rounded-sm px-2 py-1`}
              >
                #{tag.label}
              </p>
            ))}
          </div>
        </aside>
        <section className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-y-8 gap-x-3">
          {users.map(user => (
            <Link
              to={`/portfolio/${user.username}`}
              key={user.id}
              className={`mx-auto ${
                user.featured
                  ? "bg-gradient-to-br hover:from-fuchsia-500 hover:to-emerald-500"
                  : "hover:bg-gray-800"
              }  rounded-lg transition-all p-5 cursor-pointer`}
            >
              {user.featured && (
                <h3 className="underline-offset text-white text-sm font-semibold underline mb-2">
                  Featured
                </h3>
              )}
              <div className="mb-2">
                <img
                  className="avatar shadow-lg rounded-sm w-48 h-48 object-cover"
                  src={user.avatar}
                  alt={`${user.name} avatar`}
                />
              </div>
              <div className="px-2">
                <h2 className="dark:text-white font-semibold text-lg">
                  {user.name}
                </h2>
                <p className="dark:text-gray-200 text-sm">
                  {user.portfolioSettings.heading}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <div className="relative">
        <div className="absolute inset-0 container flex">
          <div className="m-auto">
            <h1 className="text-white text-4xl font-bold p-5 -bg-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-sm">
              Make your Artsume today
            </h1>
          </div>
        </div>
        <img
          className="max-h-72 object-cover w-full"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/1b23c832616941.568cab27a6aad.jpg"
          alt="low poly lighthouse"
        />
      </div>

      <Footer />
    </main>
  );
};

export default MainPage;
