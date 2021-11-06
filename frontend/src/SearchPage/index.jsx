import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { artworks } from "../artworks.json";
import { tags } from "../tags.json"

const SearchPage = () => {
  var href = location.href;
  console.log(href.match(/([^\/]*)\/*$/)[1]);

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

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
      
      <div className="flex flex-wrap">
        <div className="ml-20">
          <p1 className="dark:text-white text-2l text-center mb-8 float-right">
            Displaying {artworks.length} results
          </p1>
        </div>
        <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
          {artworks.map(artwork => {
            return (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={"hover:bg-gray-800"}
              >
                <img
                  style={{maxWidth: "20em"}}
                  className="mb-5 shadow-xl mx-auto"
                  src={artwork.image}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mb-1">
                    {artwork.name}
                  </h2>
                  <p className="dark:text-gray-300 text-sm mb-3">
                    {artwork.description}
                  </p>
                </div>



              </Link>
            );
          })}
        </div>
        </div>
        </div>

        <Footer />
    </main>
  );
};

export default SearchPage;
