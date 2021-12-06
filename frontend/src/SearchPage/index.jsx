import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { apiUrl } from "../config";
import axios from "axios";

const SearchPage = () => {
  // link from navbar file
  const urlParams = new URLSearchParams(window.location.pathname)
  const art = urlParams.get('art')
  const user = urlParams.get('usr')
  const tag = urlParams.get('tag')

  const [artworks, setArtworks] = useState([]);
  const [users, setUsers] = useState([])
  // const [portfolios, updatePortfolios] = useState([])
  const [tags, setTags] = useState([])

  let length;

  const getSearchResult = async() => {
    try {
      // set up tags to display
      const { data: tags } = await axios.get(`${apiUrl}/tags`)
      setTags(tags)

      if (art !== null) {
        const { data: artworks } = await axios.get(`${apiUrl}/artworks?query=${art}`);
        setArtworks(artworks)
        console.log(artworks)
      }
      else if (user !== null) {
        const { data: users } = await axios.get(`${apiUrl}/users`);
        /* for (const user of users) {
          const { data: portfolio } = await axios.get(`${apiUrl}/users/${user._id}/portfolio`)
          updatePortfolios( portfolios => [...portfolios, portfolio])
        } */
        setUsers(users)
      }
      else if (tag !== null) {
        let { data: artworks } = await axios.get(`${apiUrl}/artworks`);
        artworks = artworks.filter(artwork => tag in artwork.tagIds)
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
  
  useEffect(getSearchResult, [art, user, tag]);

  let msg = "results";
  if (length <= 1) {
    msg = "result";
  }

  function displaySearchResult() {
    if (user != null) {
      console.log(users)
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
              // const portfolio = portfolios.find( portfolio => Portfolio.userId === user._id )
              return (
                <Link
                  to={`/portfolio/${user._id}`}
                  key={user._id}
                  className="hover:bg-gray-800 rounded-lg transition-all p-5 
                          cursor-pointer ml-5"
                >
                  <div className="mb-2 p-3">
                    <img
                      className="mb-5 max-w-xs shadow-xl mx-10 mt-5 w-36"
                      src={user.avatarUrl}
                      alt={`${user._id}`}
                    />
                  </div>
                  <h2
                    className="dark:text-white font-semibold text-lg ml-10 
                              mb-5">
                    {user.name}
                  </h2>
                  {/* <p className="dark:text-gray-200 text-sm ml-10">
                    {user.portfolioSettings.heading}
                  </p> */}
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
