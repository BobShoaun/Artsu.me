import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";
//NOTE: replace with API calls

import { useSelector } from "react-redux";
import { useScrollToTop } from "../hooks/useScrollToTop";

import "./index.css";

const PortfolioPage = () => {
  const { username } = useParams();
  const { isPublic } = useSelector(state => state.general);
  const { jwt, user: loggedInUser } = useSelector(
    state => state.authentication
  );

  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactMessageRef = useRef();

  const user = users.find(user => user.username === username);
  // will get user from backend

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-600", light: "teal-500", dark: "teal-800" };

  useScrollToTop();

  //phase2: create method here for API call to contact the owner of the profile

  return (
    <main className="dark:bg-gray-900 scroll-smooth">
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
        <div className="container mx-auto flex item-center gap-10">
          <a href="#main" className="dark:text-white text-lg font-semibold">
            {user.name}
          </a>
          {!isPublic && (
            <Link
              to="/"
              className="text-gray-200 text-sm hover:underline self-center"
            >
              Back to Browse
            </Link>
          )}
          {jwt && loggedInUser.username === user.username && (
            <Link
              to={`/portfolio/edit/content/${user.username}`}
              className="text-gray-200 text-sm hover:underline self-center"
            >
              Edit Portfolio
            </Link>
          )}
          <a
            href="#artworks"
            className="ml-auto text-gray-200 text-sm hover:underline underline-offset"
          >
            Artworks
          </a>
          <a
            href="#contact"
            className="text-gray-200 text-sm hover:underline underline-offset"
          >
            Contact Me
          </a>
        </div>
      </header>
      <section
        id="main"
        className="flex items-center justify-around gap-10 pb-20 min-h-screen container mx-auto"
      >
        <div>
          <h1 className="dark:text-white font-bold text-4xl mb-4">
            {user.portfolioSettings.heading}
          </h1>
          <p className="dark:text-gray-300 text-sm">
            {user.portfolioSettings.biography}
          </p>
        </div>
        <div className="relative avatar-wrapper">
          <div
            className={`absolute -top-8 -left-8 w-24 h-24 rounded-lg shadow-lg bg-gradient-to-br from-${primary.light} to-${primary.dark}`}
          ></div>
          <img
            className="rounded-lg shadow-xl z-10 relative"
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
          <div
            className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-lg shadow-lg bg-gradient-to-br from-${secondary.light} to-${secondary.dark}`}
          ></div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
        id="artworks"
      >
        <div className="container mx-auto">
          <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">
            My Artworks
          </h1>
          <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-8">
            {user.portfolioSettings.artworkIds.map(id => {
              const artwork = artworks.find(artwork => artwork.id === id);
              return (
                <Link
                  to={`/artwork/${artwork.id}`}
                  key={artwork.id}
                  className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
                >
                  <img
                    className="artwork mb-5 shadow-xl mx-auto"
                    src={artwork.image}
                    alt={artwork.name}
                  />
                  <div className="text-center">
                    <h2 className="dark:text-white text-lg font-semibold mb-1">
                      {artwork.name}
                    </h2>
                    <p className="dark:text-gray-300 text-sm mb-3">
                      {artwork.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`pt-20 pb-32 bg-gradient-to-br from-${primary.main} to-${secondary.main}`}
      >
        <h1 className="dark:text-white text-2xl font-semibold text-center mb-10">
          Contact Me
        </h1>
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-14 mx-auto max-w-3xl shadow-xl">
          <form className="grid gap-x-10 gap-y-7 mb-5 contact-form">
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Name:
            </label>
            <input ref={contactNameRef} className="px-2 py-1" type="text" />
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Email:
            </label>
            <input ref={contactEmailRef} className="px-2 py-1" type="email" />
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Message:
            </label>
            <textarea
              ref={contactMessageRef}
              className="px-2 py-1"
              cols="30"
              rows="5"
            ></textarea>
          </form>
          <div className="text-right">
            <button
              onClick={() =>
                alert(
                  `Submitting message: ${contactMessageRef.current.value} from name: ${contactNameRef.current.value}, email: ${contactEmailRef.current.value}`
                )
              }
              className={`dark:text-gray-200 bg-${primary.main} hover:bg-${primary.dark} py-1 px-3`}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      <footer className="py-20 bg-gray-900">
        <h4 className="text-center dark:text-gray-300 font-semibold text-xs">
          Page created with <Link to="/">Artsu.me</Link>
        </h4>
      </footer>
    </main>
  );
};

export default PortfolioPage;
