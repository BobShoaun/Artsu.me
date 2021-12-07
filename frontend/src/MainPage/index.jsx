import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { setIsPublic } from "../store/generalSlice";
import { useScrollToTop } from "../hooks/useScrollToTop";
import "./index.css";

import Loading from "../components/Loading";
import axios from "axios";
import { apiUrl } from "../config";

import ArtsumeBanner from "../components/ArtsumeBanner";

import { useHistory } from "react-router";

const MainPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const searchInput = useRef(null);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users?limit=20`);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }, [apiUrl]);

  const getTags = useCallback(async () => {
    try {
      const { data: tags } = await axios.get(`${apiUrl}/tags`);
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  }, [apiUrl]);

  const getArtworks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/artworks?limit=14`);
      setArtworks(data.filter(artwork => !artwork.isBanned));
    } catch (e) {
      console.log(e);
    }
  }, [apiUrl]);

  useEffect(() => {
    dispatch(setIsPublic({ isPublic: false }));
    getUsers();
    getTags();
    getArtworks();
  }, [dispatch, getUsers, getTags, getArtworks]);

  useScrollToTop();

  if (users.length <= 0) return <Loading />;

  return (
    <main className="bg-gray-900 pt-20">
      <Navbar
        onSearch={() => {
          const params = new URLSearchParams();
          params.set("query", searchInput.current.value);
          history.push(`/search?${params}`);
        }}
        searchInput={searchInput}
      />
      <div className="relative">
        <div className="absolute inset-0 container flex">
          <div className="my-auto pl-5 bg-opacity-20 shadow-xl bg-gray-900 backdrop-filter backdrop-blur-sm p-5">
            <h1 className="text-white text-4xl font-bold">Discover</h1>
            <p className="text-gray-100 text-xl font-medium">Great Artwork & Talented Artists</p>
          </div>
        </div>
        <img
          className="max-h-72 object-cover w-full"
          style={{ minHeight: "5rem" }}
          src="http://res.cloudinary.com/artsu-me/image/upload/v1638819783/kwzo6zl0a3nvh6narndx.jpg"
          alt="low poly lion"
        />
      </div>
      <aside className="container mx-auto mb-8 mt-16">
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map(tag => (
            <Link key={tag._id} to={`/search?&tag=${tag._id}`}>
              <p
                style={{ background: tag.color }}
                className={`text-gray-900 -text-white cursor-pointer font-semibold text-sm rounded-sm px-2 py-1`}
              >
                #{tag.label}
              </p>
            </Link>
          ))}
        </div>
      </aside>

      <h2 className="text-gray-200 text-lg mx-auto container font-light py-2 mb-2">Top Artworks:</h2>

      <div className="overflow-hidden py-3">
        <section className="flex gap-3 justify-center mb-3">
          {artworks.slice(0, 7).map(artwork => (
            <Link className="flex-shrink-0" key={artwork._id} to={`/artwork/${artwork._id}`}>
              <img
                className="h-52 hover:shadow-lg hover:scale-105 transition-transform transform"
                src={artwork.imageUrl}
                alt={artwork.name}
              />
            </Link>
          ))}
        </section>
        <section className="flex gap-3 justify-center mb-16">
          {artworks.slice(7).map(artwork => (
            <Link className="flex-shrink-0" key={artwork._id} to={`/artwork/${artwork._id}`}>
              <img
                className="h-52 hover:shadow-lg hover:scale-105 transition-transform transform"
                src={artwork.imageUrl}
                alt={artwork.name}
              />
            </Link>
          ))}
        </section>
      </div>

      <h2 className="text-gray-200 text-lg mx-auto container font-light py-2 mb-5">Top Artists / Users:</h2>
      <section className="mb-14 container mx-auto flex flex-wrap items-center justify-evenly gap-y-3 gap-x-1">
        {users.map(user => (
          <Link
            to={`/portfolio/${user.username}`}
            key={user._id}
            className={`mx-auto ${
              user.featured
                ? "bg-gradient-to-br hover:from-fuchsia-500 hover:to-emerald-500"
                : "hover:bg-gray-800"
            }  rounded-lg transition-all p-4 cursor-pointer`}
          >
            {user.isFeatured && (
              <h3 className="underline-offset text-white text-sm font-semibold underline mb-2">
                Featured
              </h3>
            )}
            <div className="mb-2">
              <img
                className="main-page-avatar shadow-lg rounded-sm w-48 h-48 object-cover"
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
              />
            </div>
            <div className="px-2 text-center">
              <h2 className="dark:text-white font-semibold text-lg">{user.name}</h2>
              <p className="dark:text-gray-200 text-sm">{user.username}</p>
            </div>
          </Link>
        ))}
      </section>

      <div className="text-center mb-20">
        <button
          onClick={() => history.push("/search?type=user")}
          className="text-gray-100 bg-rose-600 hover:bg-rose-700 shadown-md transition-colors font-semibold text-md px-4 py-2 rounded-md"
        >
          Show More
        </button>
      </div>

      <ArtsumeBanner></ArtsumeBanner>

      <Footer />
    </main>
  );
};

export default MainPage;
