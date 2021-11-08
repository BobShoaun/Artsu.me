import { Link, useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { users } from "../users.json";
import Footer from "../components/Footer";
import { artworks } from "../artworks.json";
import "./index.css";
import { useAuthentication } from "../hooks/useAuthentication";
import Navbar from "../components/Navbar";
// API calls

const PortfolioEditorPageContent = () => {
  const history = useHistory();

  const { username } = useParams();
  const user = users.find(user => user.username === username); // NOTE: will get user from api
  const [, loggedInUser, , _logout] = useAuthentication();

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

  const [SelectedArt, setSelectedArt] = useState(
    user.portfolioSettings.artworkIds
  );

  const logout = () => {
    _logout();
    history.push("/");
  };

  function selectArt(artid) {
    if (SelectedArt.includes(artid)) {
      setSelectedArt(SelectedArt.filter(id => artid !== id));
    } else {
      setSelectedArt(SelectedArt.concat(artid));
    }
    return;
  }

  if (loggedInUser === user) {
    return (
      <main className="bg-gray-700">
        <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
          <div className="container mx-auto flex item-center gap-10">
            <a>
              <Link to="/" className="dark:text-white text-2xl font-semibold">
                artsu.me
              </Link>
            </a>
            <a className="dark:text-white text-2xl ml-auto">
              Edit Portfolio - Content
            </a>
            <button
              onClick={logout}
              className="dark:text-white text-l font-semibold ml-auto"
            >
              Logout
            </button>
          </div>
        </header>
        <section className="dark:text-white container mx-auto py-20">
          <h2 className="mb-10">1. Hero Section</h2>
          <form action="" className="grid gap-5 portfolio-form">
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Heading:
            </label>
            <input
              defalutValue={user.portfolioSettings.heading}
              className="px-2 py-1"
              type="text"
            />
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              About Me:
            </label>
            <textarea className="border"
              defaultValue={user.portfolioSettings.biography}
              rows="4"
              cols="100"
            ></textarea>
          </form>
        </section>
        <section
          className="dark:text-white container mx-auto py-20"
          id="chooseLayout"
        >
          2. Choose Artworks to Display
          <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10 my-10">
            {user.portfolioSettings.artworkIds.map(id => {
              const artwork = artworks.find(artwork => artwork.id === id);
              return (
                <button
                  onClick={() => selectArt(id)}
                  key={artwork.id}
                  className={
                    SelectedArt.includes(id)
                      ? `bg-gradient-to-br from-${primary.main} to-${secondary.main} transition-all rounded-lg p-7`
                      : "hover:bg-gray-800 rounded-lg p-7"
                  }
                >
                  <img
                    className="artworkImg"
                    src={artwork.image}
                    alt={artwork.name}
                  />
                  <div className="pl-3">
                    <h2 className="dark:text-white text-lg font-semibold mb-1">
                      {artwork.name}
                    </h2>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
          <div className="flex container mx-auto my-10">
            <div className="m-auto">
              <Link
                      to={`/profile/${user.username}/upload`}
                      key={user.id}
                      className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
              >
                <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                  Upload New Artwork
                </button>
              </Link>
            </div>
          </div>
          <section className="my-5" id="buttons">
            <div className="text-left inline-block">
              <Link
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
                to={`/portfolio/${user.username}`}
              >
                Quit
              </Link>
            </div>
            <div className="float-right inline-block">
              <Link
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
                to={`/portfolio/edit/styles/${user.username}`}
              >
                Next
              </Link>
            </div>
          </section>
        <Footer />
      </main> /* API calls to save settings */
    );
  } else {
    return (
      <main className="dark:bg-gray-900">
        <Navbar />
        <h1 className="dark:text-white text-2xl font-semibold text-center py-5 min-h-screen">
          403 Unauthorized
        </h1>
        <Footer />
      </main>
    );
  }
};

export default PortfolioEditorPageContent;
