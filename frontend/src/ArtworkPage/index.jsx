import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ImageStage from "../components/ImageStage";
import { useState, useEffect } from "react";
import { Maximize } from "react-feather";
import "./index.css";

import { apiUrl } from "../config";
import axios from "axios";

const ArtworkPage = () => {
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [user, setUser] = useState(null);
  const [artworkTags, updateArtworkTags] = useState([]);
  const [otherArtworks, setOtherArtworks] = useState([]);

  const getArtwork = async () => {
    try {
      const { data: artwork } = await axios.get(`${apiUrl}/artworks/${id}`);
      setArtwork(artwork);

      console.log(artwork.userId)
      const {data: user } = await axios.get(`${apiUrl}/users/${artwork.userId}`);
      console.log(user)
      setUser(user)

      for (const tagId of artwork.tagIds){
        const { data: tags } = await axios.get(`${apiUrl}/tags/${tagId}`);
        updateArtworkTags( artworkTags => [...artworkTags, tags]);
      }

      const { data: otherArtworks } = await axios.get(`${apiUrl}/users/${artwork.userId}/artworks`);
      otherArtworks.sort(() => 0.5 - Math.random());
      console.log(otherArtworks)

      setOtherArtworks(otherArtworks.slice(0,3));
    } catch (e) {
      console.log(e);
    }
    console.log(otherArtworks)
  };
  
  useEffect(getArtwork, [id]);
  const [fullscreen, setFullscreen] = useState(false);
  useScrollToTop();

  if (!artwork) return null;
  if (!user) return null;
  if (fullscreen) return (<ImageStage onClose={() => setFullscreen(false)} src={artwork.imageUrl} alt={artwork.name}/>);

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
            <Link to={`/portfolio/${user.username}`} className="flex-none mt-5">
              <img
                className="shadow-xl w-24 h-24 object-cover rounded-sm mb-3 mx-auto"
                src={user.avatarUrl}
                alt={user.name}
              />
              <p className="text-sm text-white text-center">by {user.name}</p>
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
          <h3 className="font-semibold text-white mb-8">More from {user.username}:</h3>
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
