import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom"; // removed useHistory
import ImageStage from "../../components/ImageStage";
import { useState, useEffect, useCallback } from "react";
import { Maximize } from "react-feather";
import "./index.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import ArtsumeBanner from "../../components/ArtsumeBanner";

import { Heart, Flag } from "react-feather";
import Loading from "../../components/Loading";
import ReportModal from "./ReportModal";

import { apiUrl } from "../../config";
import axios from "axios";
import { useHistory } from "react-router";

const ArtworkPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [artwork, setArtwork] = useState(null);
  const [artworkTags, setArtworkTags] = useState([]);
  const [otherArtworks, setOtherArtworks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const { isLoggedIn, accessToken, user, redirectToLogin } = useAuthentication();
  //const history = useHistory();

  const getArtwork = useCallback(async () => {
    try {
      const { data: artwork } = await axios.get(`${apiUrl}/artworks/${id}`);
      setArtwork(artwork);
      setLikes(artwork.likes);
      setArtworkTags(artwork.tags);

      const { data: otherArtworks } = await axios.get(`${apiUrl}/users/${artwork.userId}/artworks`);
      setOtherArtworks(
        otherArtworks
          .filter(otherArt => otherArt._id !== artwork._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      );
    } catch (e) {
      console.log(e);
      history.push("/404");
    }
  }, [id, history]);

  useEffect(() => getArtwork(), [getArtwork, id]);

  const likeArtwork = async () => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }
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
    if (!isLoggedIn) return;
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

  if (!artwork) return <Loading />;

  if (fullscreen)
    return (
      <ImageStage onClose={() => setFullscreen(false)} src={artwork.imageUrl} alt={artwork.name} />
    );

  const hasLiked = isLoggedIn ? likes.includes(user._id) : false;

  return (
    <main className="bg-gray-900 min-h-screen pt-20">
      <Navbar />

      {showReport && <ReportModal artwork={artwork} onClose={() => setShowReport(false)} />}

      <div className="container pt-20 py-32 mx-auto flex gap-14">
        <main className="flex-1">
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
          <div className="border-gray-400 mb-10" style={{ borderBottomWidth: "1px" }}>
            <div className="float-right flex items-center gap-x-2">
              <button
                onClick={hasLiked ? unlikeArtwork : likeArtwork}
                className="text-white flex gap-2 items-center hover:bg-gray-800 px-2 py-1 rounded-sm"
              >
                <Heart
                  className={` ${hasLiked ? "text-rose-400 fill-current" : "text-white"} `}
                  size={20}
                />
                {likes.length} Like{likes.length === 1 ? "" : "s"}
              </button>

              <button
                onClick={() => (isLoggedIn ? setShowReport(true) : redirectToLogin())}
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
            <div>
              <h1 className="text-white text-left text-2xl font-bold mb-1">{artwork.name}</h1>
              <p className="text-left text-gray-300 font mb-4">{artwork.summary}</p>
            </div>
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
                    <Link key={tag._id} to={`/search?tag=${tag._id}`}>
                      <p
                        style={{ background: tag.color }}
                        className={`text-gray-900 cursor-pointer font-semibold text-sm rounded-sm px-2 py-1`}
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
          <h3 className="font-light text-gray-100 mb-4">More from {artwork.user.username}:</h3>
          <div className="mx-auto grid place-items-center gap-4">
            {otherArtworks.map(otherArt => (
              <Link
                key={otherArt.id}
                to={`/artwork/${otherArt.id}`}
                className="hover:bg-gray-800 hover:scale-105 transform transition-transform"
              >
                <img className="shadow-lg w-48" src={otherArt.imageUrl} alt={otherArt.name} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <ArtsumeBanner></ArtsumeBanner>

      <Footer />
    </main>
  );
};

export default ArtworkPage;
