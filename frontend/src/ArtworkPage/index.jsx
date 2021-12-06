import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ImageStage from "../components/ImageStage";
import { useState, useEffect } from "react";
import { Maximize } from "react-feather";
import "./index.css";
import { useAuthentication } from "../hooks/useAuthentication";

import { Heart, Flag } from "react-feather";
import Loading from "../components/Loading";
import ReportModal from "./ReportModal";

import { apiUrl } from "../config";
import axios from "axios";

const ArtworkPage = () => {
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [artworkTags, updateArtworkTags] = useState([]);
  const [otherArtworks, setOtherArtworks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const [accessToken, user] = useAuthentication();

  const getArtwork = async () => {
    try {
      const { data: artwork } = await axios.get(`${apiUrl}/artworks/${id}`);
      setArtwork(artwork);
      setLikes(artwork.likes);

      for (const tagId of artwork.tagIds) {
        const { data: tags } = await axios.get(`${apiUrl}/tags/${tagId}`);
        updateArtworkTags(artworkTags => [...artworkTags, tags]);
      }

      const { data: otherArtworks } = await axios.get(`${apiUrl}/users/${artwork.userId}/artworks`);
      setOtherArtworks(
        otherArtworks
          .filter(otherArt => otherArt._id !== artwork._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(getArtwork, [id]);

  const likeArtwork = async () => {
    if (!accessToken) return;
    try {
      const { data } = await axios.post(`${apiUrl}/artworks/${id}/like`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setLikes(data.likes);
    } catch (e) {
      console.log(e);
    }
  };

  const unlikeArtwork = async () => {
    if (!accessToken) return;
    try {
      const { data } = await axios.delete(`${apiUrl}/artworks/${id}/unlike`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setLikes(data.likes);
    } catch (e) {
      console.log(e);
    }
  };

  const [fullscreen, setFullscreen] = useState(false);
  // useScrollToTop();

  if (!artwork) return <Loading />;

  if (fullscreen)
    return (
      <ImageStage onClose={() => setFullscreen(false)} src={artwork.imageUrl} alt={artwork.name} />
    );

  const hasLiked = likes.includes(user._id);

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />

      {showReport && <ReportModal artwork={artwork} onClose={() => setShowReport(false)} />}

      <div className="container pt-20 py-32 mx-auto flex gap-14">
        <main>
          <div
            onClick={() => setFullscreen(true)}
            className="bg-black mb-8 cursor-zoom-in shadow-inner"
          >
            <img
              className="artwork-page-artwork mx-auto shadow-xl "
              src={artwork.imageUrl}
              alt={artwork.name}
            />
          </div>
          <div className="relative border-gray-400 mb-10" style={{ borderBottomWidth: "1px" }}>
            <div className="absolute right-0 flex items-center gap-3">
              <button
                onClick={hasLiked ? unlikeArtwork : likeArtwork}
                className="text-white flex gap-2 items-center hover:bg-gray-800 px-2 py-1 rounded-sm"
              >
                <Heart
                  className={` ${hasLiked ? "text-rose-400 fill-current" : "text-white"} `}
                  size={20}
                />
                {likes.length} Likes
              </button>

              <button
                onClick={() => setShowReport(true)}
                className="text-white hover:bg-gray-800 px-2 py-1 flex gap-2 items-center rounded-sm"
              >
                <Flag className="text-white" size={20} />
                Report
              </button>

              <button
                onClick={() => setFullscreen(true)}
                className="text-white flex gap-2 items-center hover:bg-gray-800 px-2 py-1 rounded-sm"
              >
                <Maximize size={20} />
                Fullscreen
              </button>
            </div>

            <h1 className="text-white text-left text-2xl font-bold mb-1">{artwork.name}</h1>
            <p className="text-left text-gray-300 font mb-4">{artwork.summary}</p>
          </div>

          <section className="flex gap-8">
            <Link to={`/portfolio/${artwork.user.username}`} className="flex-none">
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
            {otherArtworks.map(otherArt => (
              <Link key={otherArt.id} to={`/artwork/${otherArt.id}`} className="hover:bg-gray-800">
                <img className="shadow-lg w-36" src={otherArt.imageUrl} alt={otherArt.name} />
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
