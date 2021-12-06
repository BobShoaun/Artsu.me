import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
/* import { artworks } from "../artworks.json";
import { users } from "../users.json";
import { tags } from "../tags.json"; */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { apiUrl } from "../config";
import axios from "axios";

const SearchPage = () => {
  // link from navbar file
  const urlParams = new URLSearchParams(window.location.pathname)
  const art = urlParams.get('art')
  const user = urlParams.get('usr')
  const tag = urlParams.get('tag')
  console.log(art, user, tag)

  const [artworks, setArtworks] = useState([]);
  const [users, setUsers] = useState([])
  const [tags, setTags] = useState([])

  let length;

  const getSearchResult = async() => {
    try {
      // set up tags to display
      const { data: tags } = await axios.get(`${apiUrl}/tags`)
      setTags(tags)

      if (art) {
        const { data: artworks } = await axios.get(`${apiUrl}/artworks?name=${art}`);
        setArtworks(artworks)
      }
      else if (user) {
        const { data: users } = await axios.get(`${apiUrl}/users?name=${user}`);
        setUsers(users)
      }
      else if (tag) {
        const { data: artworks } = await axios.get(`${apiUrl}/artworks?tags=${[tag]}`);
        setArtworks(artworks)
      }
      else {
        const { data: artworks } = await axios.get(`${apiUrl}/artworks`);
        setArtworks(artworks)
      }
    } catch(e) {
      console.log(e);
    }
  }

  getSearchResult()

  let msg = "results";
  if (length <= 1) {
    msg = "result";
  }

  function displaySearchResult() {
    if (user) {
      // console.log('user')
      length = users.length
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
    else {
      length = artworks.length
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
                  className={"hover:bg-gray-800"}>
                  <img className="mb-5 max-w-xs shadow-xl mx-10 mt-5 max-w-20"
                    src={artwork.imageUrl}
                    alt={artwork.name}/>
                  <div className="pl-3">
                    <h2 className="dark:text-white text-lg font-semibold mb-1 ml-10">
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
  }

  return (
    <main className="dark:bg-gray-900">
      <Navbar showSearchButtons />
      <div className="container mx-auto mb-20 flex py-20 gap-8">
        <aside className="search-tag-aside">
          <h3 className="dark:text-gray-200 mb-3 font-semibold">Tags:</h3>
          <div className=" flex-shrink-0 flex-wrap gap-3">
            { tags.map(tag => {
              return (
                <Link to={`/search/&tag=${tag._id}`}
                      key={tag._id}>
                  <p className={`text-gray-700 cursor-pointer font-semibold 
                              text-sm bg-${tag.color} rounded-sm px-2 py-2 my-5`}>
                    #{tag.label}
                  </p>
                </Link>
              );
            }) }
          </div>
        </aside>
        {displaySearchResult()}
      </div>
      <Footer />
    </main>
  );
};

export default SearchPage;
