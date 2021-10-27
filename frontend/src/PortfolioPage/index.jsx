import { Link } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";

const PortfolioPage = () => {
  const user = users[0];

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

  return (
    <main className="dark:bg-gray-900">
      <header className="container z-20 mx-auto flex items-center gap-10 py-5 shadow-lg backdrop-filter backdrop-blur-sm sticky top-0">
        <a href="#main" className="dark:text-white text-lg font-semibold">
          {user.name}
        </a>
        <a
          href="#artworks"
          className="ml-auto text-gray-200 text-sm hover:underline"
          style={{ textUnderlineOffset: "3px" }}
        >
          Artworks
        </a>
        <a
          href="#contact"
          className="text-gray-200 text-sm hover:underline"
          style={{ textUnderlineOffset: "3px" }}
        >
          Contact Me
        </a>
        <Link
          className="text-gray-200 text-sm hover:underline"
          style={{ textUnderlineOffset: "3px" }}
        >
          Follow
        </Link>
      </header>
      <div className="container mx-auto">
        <section
          id="main"
          className="flex items-center justify-around gap-10 py-20"
        >
          <div style={{ flexBasis: "50%" }}>
            <h1 className="dark:text-white font-bold text-4xl mb-4">
              Welcome to my Portfolio!
            </h1>
            <p className="dark:text-gray-300 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s
            </p>
          </div>
          <div className="relative" style={{ flexBasis: "30%" }}>
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

        <section className="py-20" id="artworks">
          <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">
            My Artworks
          </h1>
          <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
            {artworks.slice(0, 5).map((artwork) => (
              <div
                key={artwork.id}
                className={`bg-gradient-to-br hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-10 cursor-pointer hover:shadow-xl`}
              >
                <img
                  style={{ maxWidth: "20em" }}
                  className="mb-5 shadow-xl"
                  src={artwork.image}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mb-1">
                    {artwork.name}
                  </h2>
                  <p className="dark:text-gray-300 text-sm">
                    {artwork.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        id="contact"
        className={`pt-20 pb-32 bg-gradient-to-br from-${primary.main} to-${secondary.main}`}
      >
        <h1 className="dark:text-white text-3xl font-semibold text-center mb-14">
          Contact Me
        </h1>
        <div className=" bg-gray-800 bg-opacity-80 rounded-lg p-16 mx-auto max-w-3xl shadow-xl">
          <form
            className="grid gap-x-10 gap-y-7 mb-5"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <label className="dark:text-white">Name</label>
            <input className="px-2 py-1" type="text" />
            <label className="dark:text-white">Email</label>
            <input className="px-2 py-1" type="text" />
            <label className="dark:text-white">Message</label>
            <textarea
              className="px-2 py-1"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </form>
          <div className="text-right">
            <button
              className={`dark:text-white bg-${primary.main} hover:bg-${primary.dark} py-1 px-3`}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      <footer className="py-20 bg-gray-800">
        <h4 className="text-center dark:text-gray-300 font-semibold text-xs">
          Page created with Artsu.me
        </h4>
      </footer>
    </main>
  );
};

export default PortfolioPage;
