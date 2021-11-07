import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { artworks } from "../artworks.json";
import { tags } from "../tags.json"

const SearchPage = () => {
  const target = window.location.pathname.split('search').pop().replace('/', '')
  console.log(target)
  let artworksFiltered = artworks
  if (target !== "/") {
    artworksFiltered = artworks.filter(artwork => artwork.name.toLowerCase().includes(target.toLowerCase().replace("%20", " ")))
  }

  let msg = "results";
  if (artworksFiltered.length<=1) {
    msg = 'result';
  }

  return (
    <main className="dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto mb-20 flex py-20 gap-8">
        <aside style={{ flexBasis: "12em" }}>
          <h3 className="dark:text-gray-200 mb-3 font-semibold">Tags:</h3>
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => {
              return (<p
                key={tag.id}
                className={`text-gray-700 cursor-pointer font-semibold text-sm bg-${tag.color} rounded-sm px-2 py-1`}
              >
                #{tag.label}
              </p>);
            })}
          </div>
        </aside>
      
      <div>
        <div className="ml-20 w-full mb-10">
          <p1 className="dark:text-white text-2l w-100% float-left mr-10">
            Displaying {artworksFiltered.length} {msg}
          </p1>
        </div>
        <div className="flex flex-wrap justify-around gap-x-5 gap-y-5">
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
        </div>

        <Footer />
    </main>
  );
};

export default SearchPage;
