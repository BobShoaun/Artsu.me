import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import { apiUrl } from "../config";
import axios from "axios";

const SearchPage = () => {
  const history = useHistory();

  const [artworks, setArtworks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);

  const type = useRef("artwork");
  const query = useRef("");
  const tagId = useRef("");

  const searchInput = useRef(null);

  const getTags = async () => {
    try {
      const { data: tags } = await axios.get(`${apiUrl}/tags`);
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  };

  const getUsers = async () => {
    try {
      const { data: users } = await axios.get(`${apiUrl}/users?query=${query.current}`);
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  };

  const getArtworks = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/artworks?query=${query.current}`);
      const artworks = tagId.current
        ? data.filter(art => art.tagIds.includes(tagId.current))
        : data;
      setArtworks(artworks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTags();
    const params = new URLSearchParams(history.location.search);
    type.current = params.get("type") || "artwork";
    query.current = params.get("query") || "";
    tagId.current = params.get("tag") || "";
    search();
  }, [history]);

  const search = () => {
    if (type.current === "user") getUsers();
    else getArtworks();
    const params = new URLSearchParams();
    params.set("query", query.current);
    params.set("type", type.current);
    params.set("tag", tagId.current);
    history.push(`/search?${params}`);
  };

  const numResults = type.current === "user" ? users.length : artworks.length;

  return (
    <main className="bg-gray-900">
      <Navbar
        onSearch={() => {
          query.current = searchInput.current.value;
          search();
        }}
        searchInput={searchInput}
      />
      <div className="container mx-auto pt-20 mb-20 py-20 gap-8">
        <div className="flex flex-wrap gap-3 mx-auto my-10 justify-center">
          {tags.map(tag => (
            <button
              key={tag._id}
              onClick={() => {
                tagId.current = tag._id;
                search();
              }}
              className={`text-gray-900 cursor-pointer font-semibold text-sm bg-${tag.color} rounded-sm px-2 py-1`}
            >
              #{tag.label}
            </button>
          ))}
        </div>
        <div className="flex items-center mb-10">
          <p className="dark:text-white text-sm font-light">Showing {numResults} results</p>
          <div className="text-center ml-auto text-sm text-white">
            <button
              onClick={() => {
                query.current = "";
                tagId.current = "";
                searchInput.current.value = "";
                search();
              }}
              className="mr-6 hover:underline"
            >
              Clear search
            </button>
            <button
              onClick={() => {
                type.current = "artwork";
                search();
              }}
              className={`${
                type.current === "artwork" ? "bg-gray-600 shadow-inner" : "bg-gray-800"
              } px-3 py-1 mr-px rounded-l-sm hover:bg-gray-600`}
            >
              Artworks
            </button>
            <button
              onClick={() => {
                type.current = "user";
                search();
              }}
              className={`${
                type.current === "user" ? "bg-gray-600" : "bg-gray-800"
              } px-3 py-1 rounded-r-sm hover:bg-gray-600`}
            >
              Artists
            </button>
          </div>
        </div>

        {numResults <= 0 && (
          <div className="mt-32 mb-20">
            <h2 className="text-gray-400 font-bold text-center">
              Looks like there are no results for your query.
            </h2>
          </div>
        )}

        <div className="flex flex-wrap gap-x-2 gap-y-8 justify-evenly">
          {type.current === "user"
            ? users.map(user => (
                <Link
                  to={`/portfolio/${user._id}`}
                  key={user._id}
                  className="hover:bg-gray-800 rounded-md transition-colors p-6 mx-3"
                >
                  <img
                    className="h-52 shadow-xl mb-3 mx-auto"
                    src={user.avatarUrl}
                    alt={`${user._id}`}
                  />
                  <div className="text-center mx-auto max-w-sm">
                    <h2 className="dark:text-white text-lg font-semibold">{user.name}</h2>
                    <p className="dark:text-gray-300 text-sm">{user.username}</p>
                  </div>
                </Link>
              ))
            : artworks.map(artwork => (
                <Link
                  to={`/artwork/${artwork._id}`}
                  key={artwork._id}
                  className={"hover:bg-gray-800 p-6 transition-colors rounded-md"}
                >
                  <img
                    className="h-52 shadow-xl mb-3 mx-auto"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                  <div className="text-center mx-auto max-w-sm">
                    <h2 className="dark:text-white text-lg font-semibold">{artwork.name}</h2>
                    <p className="dark:text-gray-300 text-sm">{artwork.summary}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SearchPage;
