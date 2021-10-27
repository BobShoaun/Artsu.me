import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { users } from "../users.json";

import { Link } from "react-router-dom";

import { tags } from "../tags.json";

const MainPage = () => {
  return (
    <main className="dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto mb-20 flex py-20 gap-8">
        <aside style={{ flexBasis: "12em" }}>
          <h3 className="dark:text-gray-200 mb-3 font-semibold">Tags:</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <p
                key={tag.id}
                className={`text-gray-700 cursor-pointer font-semibold text-sm bg-${tag.color} rounded-sm px-2 py-1`}
              >
                #{tag.label}
              </p>
            ))}
          </div>
        </aside>
        <section className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-7">
          {users.map(user => (
            <Link
              to={`/portfolio/${user.slug}`}
              key={user.id}
              className={`mx-auto ${
                user.featured
                  ? "bg-gradient-to-br hover:from-fuchsia-500 hover:to-emerald-500"
                  : "hover:bg-gray-800"
              }  rounded-lg transition-all p-5 cursor-pointer`}
            >
              {user.featured && (
                <h3
                  className="text-white text-sm font-semibold underline"
                  style={{ textUnderlineOffset: "2px" }}
                >
                  Featured
                </h3>
              )}
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
              <p className="dark:text-gray-200 text-sm">
                {user.portfolioSettings.heading}
              </p>
            </Link>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default MainPage;
