import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";
import { tags } from "../tags.json";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ImageStage from "../components/ImageStage";
import { useState, useEffect } from "react";
import { Maximize } from "react-feather";
import "./index.css";

import { apiUrl } from "../config";
import axios from "axios";

const ArtworkPage = () => {
  const { id } = useParams();
  // const artwork = artworks.find(artwork => artwork.id === parseInt(id)); // NOTE: will be replaced by api call
  // const user = users.find(user => user.id === artwork.authorId); // NOTE: will be replaced by api call

  const artworkTags = [];
  // artwork.tagIds.forEach(tagId => {
  //   artworkTags.push(tags.find(tag => tag.id === tagId));
  // });

  const [artwork, setArtwork] = useState(null);

  const getArtwork = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/artworks/${id}`);
      console.log(data);
      setArtwork(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(getArtwork, []);

  const otherArtworks = [];
  // user.portfolioSettings.artworkIds
  //   .filter(id => id !== artwork.id)
  //   .map(id => artworks.find(artwork => artwork.id === id))
  //   .sort(() => 0.5 - Math.random());

  // grab artworks, remove currently displayed one, and roughly shuffle them (shuffle apporach found online)

  const [fullscreen, setFullscreen] = useState(false);

  useScrollToTop();

  if (!artwork) return null;

  if (fullscreen)
    return (
      <ImageStage onClose={() => setFullscreen(false)} src={artwork.imageUrl} alt={artwork.name} />
    );

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container pt-20 py-32 mx-auto flex gap-14">
        <main>
          <img
            onClick={() => setFullscreen(true)}
            className="artwork-page-artwork mx-auto shadow-xl cursor-zoom-in mb-8"
            src={artwork.imageUrl}
            alt={artwork.name}
          />

          <div className="relative">
            <button
              onClick={() => setFullscreen(true)}
              className="text-gray-800 text-xs py-1 px-3 font-semibold rounded-sm absolute right-0 flex gap-1 items-center bg-gray-300"
            >
              Fullscreen <Maximize size={13} strokeWidth={3} />
            </button>

            <h1 className="text-white text-center text-2xl font-bold mb-1">{artwork.name}</h1>
            <p className="text-center text-gray-300 font mb-14">{artwork.summary}</p>
          </div>

          <section className="flex gap-8">
            <Link to={`/portfolio/${artwork.user.username}`} className="flex-none mt-5">
              <img
                className="shadow-xl w-24 h-24 object-cover rounded-sm mb-3 mx-auto"
                src={artwork.user.avatarUrl}
                alt={artwork.user.name}
              />
              <p className="text-sm text-white text-center">by {artwork.user.name}</p>
            </Link>
            <div>
              {artworkTags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-5">
                  {artworkTags.map(tag => (
                    <Link key={tag.id} to={`/search/&tag=${tag.label}`}>
                      <p
                        className={`text-gray-900 cursor-pointer font-semibold text-xs bg-${tag.color} rounded-sm px-2 py-1`}
                      >
                        #{tag.label}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              <p className="text-gray-200 text-sm">{artwork.description}</p>
            </div>
          </section>
        </main>

        <aside className="flex-none">
          <h3 className="font-semibold text-white mb-8">More from {artwork.user.username}:</h3>
          <div className="mx-auto grid place-items-center gap-8">
            {otherArtworks.map(artwork => (
              <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="hover:bg-gray-800">
                <img className="shadow-lg w-36" src={artwork.image} alt={artwork.name} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
};

export default ArtworkPage;
