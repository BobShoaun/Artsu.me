import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
/* import { artworks } from "../artworks.json";
import { users } from "../users.json";
import { tags } from "../tags.json"; */
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { apiUrl } from "../config";
import axios from "axios";

const SearchPage = () => {
  const target = window.location.pathname
    .split("search")
    .pop()
    .replace("/", "")
    .replace("%20", " ")
    .toLowerCase();

  const [artworks, setArtworks] = useState([]);
  const [users, setUsers] = useState([])
  const [tags, setTags] = useState([])

  const getSearchResult = async() => {
    try {
      const { data: artworks } = await axios.get(`${apiUrl}/artworks`);
      setArtworks(artworks)
      console.log(artworks)
      const { data: users } = await axios.get(`${apiUrl}/users`);
      setUsers(users)
      const { data: tags } = await axios.get(`${apiUrl}/tags`);
      setTags(tags)
    } catch(e) {
      console.log(e);
    }
  }

  /* eslint-disable no-unused-expressions */
  getSearchResult();

  function displaySearchResult() {
    let length = artworks.length;
    /* if (target.substr(0, 5) === "&tag=") {
      let tagFiltered = tags.filter(
        // API calls to get the tag searched
        tag => tag.label.toLowerCase() === target.substr(5)
      );
      let tag = tagFiltered.map(tag => tag.id)[0];
      artworksFiltered = artworks.filter(
        (
          artwork // API calls to get artworks with specified tag
        ) => artwork.tagIds.includes(tag)
      );
      length = artworksFiltered.length;
    } else  */
    if (target.substr(0, 5) === "&art=") {
      /* artworksFiltered = artworks.filter(
        (
          artwork // API calls to get arts searched
        ) => artwork.name.toLowerCase().includes(target.substr(5))
      ); */
      length = artworks.length;
    } else if (target.substr(0, 5) === "&usr=") {
      /* usersFiltered = users.filter(
        (
          user // API calls to get users searched
        ) => user.name.toLowerCase().includes(target.substr(5))
      ); */
      length = users.length;
      let msg = "results";
      if (users.length <= 1) {
        msg = "result";
      }
      return (
        <div>
          <div className="ml-20 w-full mb-10">
            <p className="dark:text-white float-left mr-10">
              Displaying {length} {msg}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-10">
            {users.map(user => {
              return (
                <Link
                  to={`/portfolio/${user.username}`}
                  key={user.id}
                  className="hover:bg-gray-800 rounded-lg transition-all p-5 
                          cursor-pointer ml-5"
                >
                  <div className="mb-2 p-3">
                    <img
                      className="mb-5 max-w-xs shadow-xl mx-10 mt-5 w-36"
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                    />
                  </div>
                  <h2
                    className="dark:text-white font-semibold text-lg ml-10 
                              mb-5"
                  >
                    {user.name}
                  </h2>
                  <p className="dark:text-gray-200 text-sm ml-10">
                    {user.portfolioSettings.heading}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
    let msg = "results";
    if (artworks.length <= 1) {
      msg = "result";
    }
    return (
      <div>
        <div className="ml-20 w-full mb-10">
          <p className="dark:text-white text-2l w-100% float-left mr-10">
            Displaying {length} {msg}
          </p>
        </div>
        <div className="flex flex-wrap justify-around gap-x-10 gap-y-10">
          {artworks.map(artwork => {
            return (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={"hover:bg-gray-800"}
              >
                <img
                  className="mb-5 max-w-xs shadow-xl mx-10 mt-5 max-w-20"
                  src={artwork.imageUrl}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2
                    className="dark:text-white text-lg font-semibold mb-1
                                ml-10"
                  >
                    {artwork.name}
                  </h2>
                  <p className="dark:text-gray-300 text-sm m-5 ml-10">
                    {artwork.summary}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <main className="dark:bg-gray-900">
      <Navbar showSearchButtons />
      <div className="container mx-auto mb-20 flex py-20 gap-8">
        <aside className="search-tag-aside">
          <h3 className="dark:text-gray-200 mb-3 font-semibold">Tags:</h3>
          <div className=" flex-shrink-0 flex-wrap gap-3">
            {/* {tags.map(tag => {
              return (
                <Link to={`/search/&tag=${tag.label}`}>
                  <p
                    key={tag.id}
                    className={`text-gray-700 cursor-pointer font-semibold 
                              text-sm bg-${tag.color} rounded-sm px-2 py-2 my-5`}
                  >
                    #{tag.label}
                  </p>
                </Link>
              );
            })} */}
          </div>
        </aside>
        {displaySearchResult()}
      </div>
      <Footer />
    </main>
  );
};

export default SearchPage;
