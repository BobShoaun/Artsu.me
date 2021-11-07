import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { users } from "../users.json";

import { Link, useParams } from "react-router-dom";

import { tags } from "../tags.json";
import { artworks } from "../artworks.json";

const ProfilePage = () => {
  const { username } = useParams();
  const user = users.find(user => user.username === username);

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

  return (
    <main className="dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto flex mb-20 py-20 gap-8 text-center">
        <aside style={{ flexBasis: "12em" }}>
          <div className="gap-3">
            <img
              style={{ maxWidth: "12em" }}
              className="mx-auto shadow-lg rounded-lg"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
          </div>
          <h3 className="dark:text-gray-200 mt-3 mb-6 font-semibold content-center text-center">
            {user.name}
          </h3>
          <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm text-center">
            Remove User Avatar
          </button>
        </aside>
        <section className="dark:bg-gray">
          <ul className="items-centre gap-10 container mx-auto">
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">
                  name:{" "}
                </h3>
              </li>
              <li className="ml-auto">
                <p className="dark:text-gray-200 text-right">
                  {user.name}
                </p>
              </li>
            </ul>
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">
                  username:{" "}
                </h3>
              </li>
              <li className="ml-auto">
                <p className="dark:text-gray-200 text-right">
                  {user.username}
                </p>
              </li>
            </ul>
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">
                  heading:{" "}
                </h3>
              </li>
              <li className="ml-auto">
                <p className="dark:text-gray-200 text-right">
                  {user.portfolioSettings.heading}
                </p>
              </li>
            </ul>
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">
                  biography:{" "}
                </h3>
              </li>
              <li className="ml-auto">
                <p className="dark:text-gray-200 text-right">
                  {user.portfolioSettings.biography}
                </p>
              </li>
            </ul>
            <div className="text-right">
              <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                Remove Biography
              </button>
              <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                Remove Heading
              </button>
              <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                Temporary Ban User
              </button>
              <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                Ban User
              </button>
            </div>
          </ul>
        </section>
      </div>
      <section
        className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
        id="artworks"
      >
        <div className="container mx-auto mb-10">
          <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">
            User Artworks
          </h1>
          <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
            {user.portfolioSettings.artworkIds.map(id => {
              const artwork = artworks.find(artwork => artwork.id === id);
              return (
                <Link
                  to={`/admin/artwork/${artwork.id}`}
                  key={artwork.id}
                  className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-7 cursor-pointer hover:shadow-xl`}
                >
                  <img
                    style={{ maxWidth: "10em" }}
                    className="mb-5 shadow-xl mx-auto"
                    src={artwork.image}
                    alt={artwork.name}
                  />
                  <div className="pl-3">
                    <h2 className="dark:text-white text-lg font-semibold mb-1">
                      {artwork.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProfilePage;
