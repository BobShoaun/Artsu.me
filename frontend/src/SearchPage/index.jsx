import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { artworks } from "../artworks.json";
import { users } from "../users.json";
import { tags } from "../tags.json";

const SearchPage = () => {
  const target = window.location.pathname
    .split("search")
    .pop()
    .replace("/", "")
    .replace("%20", " ")
    .toLowerCase();

  let artworksFiltered = artworks;
  let usersFiltered = users;
  let length = artworksFiltered.length;

  function displaySearchResult() {
    if (target.substr(0, 5) === "&tag=") {
      let tagFiltered = tags.filter(
        tag => tag.label.toLowerCase() === target.substr(5)
      );
      let tag = tagFiltered.map(tag => tag.id)[0];
      artworksFiltered = artworks.filter(artwork =>
        artwork.tagids.includes(tag)
      );
      length = artworksFiltered.length;
    } else if (target.substr(0, 5) === "&art=") {
      artworksFiltered = artworks.filter(artwork =>
        artwork.name.toLowerCase().includes(target.substr(5))
      );
      length = artworksFiltered.length;
    } else if (target.substr(0, 5) === "&usr=") {
      usersFiltered = users.filter(user =>
        user.name.toLowerCase().includes(target.substr(5))
      );
      length = usersFiltered.length;

      return (
        <div className="flex flex-wrap gap-x-10 gap-y-10">
          {usersFiltered.map(user => {
            return (
              <Link
                to={`/portfolio/${user.slug}`}
                key={user.id}
                className="hover:bg-gray-800 rounded-lg transition-all p-5 cursor-pointer"
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
                <p className="dark:text-gray-200 text-sm">
                  {user.portfolioSettings.heading}
                </p>
              </Link>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <div className="ml-20 w-full mb-10">
          <p1 className="dark:text-white text-2l w-100% float-left mr-10">
            Displaying {length} {msg}
          </p1>
        </div>
        <div className="flex flex-wrap justify-around gap-x-10 gap-y-10">
          {artworksFiltered.map(artwork => {
            return (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={"hover:bg-gray-800"}
              >
                <img
                  className="mb-5 max-w-xs shadow-xl mx-10 mt-5 max-w-20"
                  src={artwork.image}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mb-1 ml-10">
                    {artwork.name}
                  </h2>
                  <p className="dark:text-gray-300 text-sm mb-3 ml-10">
                    {artwork.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  let msg = "results";
  if (artworksFiltered.length <= 1) {
    msg = "result";
  }

  return (
    <main className="dark:bg-gray-900">
      <Navbar showSearchButtons />
      <div className="container mx-auto mb-20 flex py-20 gap-8">
        <aside style={{ flexBasis: "12em" }}>
          <h3 className="dark:text-gray-200 mb-3 font-semibold">Tags:</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => {
              return (
                <Link to={`/search/&tag=${tag.label}`}>
                  <p
                    key={tag.id}
                    className={`text-gray-700 cursor-pointer font-semibold text-sm bg-${tag.color} rounded-sm px-2 py-1`}
                  >
                    #{tag.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </aside>

        {displaySearchResult()}
      </div>
      <Footer />
    </main>
  );
};

export default SearchPage;
