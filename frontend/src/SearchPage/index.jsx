import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router";

import { apiUrl } from "../config";
import axios from "axios";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ArtsumeBanner from "../components/ArtsumeBanner";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";
import ArtworkCard from "../components/ArtworkCard";

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
  useScrollToTop();

  const search = useCallback(() => {
    if (type.current === "user") getUsers();
    else getArtworks();
    const params = new URLSearchParams();
    params.set("query", query.current);
    params.set("type", type.current);
    params.set("tag", tagId.current);
    history.push(`/search?${params}`);
  }, [history]);

  useEffect(() => {
    getTags();
    const params = new URLSearchParams(history.location.search);
    type.current = params.get("type") || "artwork";
    query.current = params.get("query") || "";
    tagId.current = params.get("tag") || "";
    search();
  }, [search, history]);

  if ((!users.length && !artworks.length) || !tags.length) return <Loading />;

  const numResults = type.current === "user" ? users.length : artworks.length;

  return (
    <main className="bg-gray-900 pt-20">
      <Navbar
        onSearch={() => {
          query.current = searchInput.current.value;
          search();
        }}
        searchInput={searchInput}
      />
      <div className="container mx-auto mb-20 py-10 gap-8">
        <div className="flex flex-wrap gap-3 mx-auto my-10 justify-center">
          {tags.map(tag => (
            <button
              key={tag._id}
              onClick={() => {
                tagId.current = tag._id;
                search();
              }}
              style={{ background: tag.color }}
              className={`text-gray-900 cursor-pointer font-semibold text-sm rounded-sm px-2 py-1`}
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
            ? users.map(user => <UserCard key={user._id} user={user} />)
            : artworks.map(artwork => <ArtworkCard key={artwork._id} artwork={artwork} />)}
        </div>
      </div>
      <ArtsumeBanner />
      <Footer />
    </main>
  );
};

export default SearchPage;
