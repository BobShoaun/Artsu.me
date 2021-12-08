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
import { apiUrl, defaultAvatarUrl } from "../config";

import ArtsumeBanner from "../components/ArtsumeBanner";
import UserCard from "../components/UserCard";

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
  }, []);

  const getTags = useCallback(async () => {
    try {
      const { data: tags } = await axios.get(`${apiUrl}/tags`);
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getArtworks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/artworks?limit=14`);
      setArtworks(data.filter(artwork => !artwork.isBanned));
    } catch (e) {
      console.log(e);
    }
  }, []);

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
            <p className="text-gray-100 text-xl font-medium">
              Great Artwork &#38; Talented Artists
            </p>
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

      <div className="container mx-auto mb-2">
        <h2 className="text-gray-200 text-lg font-light py-2">Top Artworks:</h2>
      </div>

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
        <section className="flex gap-3 justify-center mb-8">
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

      <div className="text-center mb-16">
        <button
          onClick={() => history.push("/search?type=artwork")}
          className="text-gray-100 bg-teal-600 hover:bg-teal-700 shadown-md transition-colors font-semibold text-md px-4 py-2 rounded-md"
        >
          Show More Artworks
        </button>
      </div>

      <h2 className="text-gray-200 text-lg mx-auto container font-light py-2 mb-5">
        Top Artists / Users:
      </h2>
      <section className="mb-14 container mx-auto flex flex-wrap items-center justify-evenly gap-y-4 gap-x-1">
        {users.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </section>

      <div className="text-center mb-20">
        <button
          onClick={() => history.push("/search?type=user")}
          className="text-gray-100 bg-rose-600 hover:bg-rose-700 shadown-md transition-colors font-semibold text-md px-4 py-2 rounded-md"
        >
          Show More Users
        </button>
      </div>

      <ArtsumeBanner></ArtsumeBanner>

      <Footer />
    </main>
  );
};

export default MainPage;
