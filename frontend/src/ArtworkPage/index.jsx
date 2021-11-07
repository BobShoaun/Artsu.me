import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";
import { tags } from "../tags.json";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ImageStage from "../components/ImageStage";
import { useState } from "react";

const ArtworkPage = () => {
  const { id } = useParams();
  const artwork = artworks.find(artwork => artwork.id === parseInt(id)); // NOTE: will be replaced by api call
  const user = users.find(user => user.id === artwork.author_id); // NOTE: will be replaced by api call
  const artworkTags = [];
  artwork.tagids.forEach(tagid => {
    artworkTags.push(tags.find(tag => tag.id === tagid));
  });

  const otherArts = user.portfolioSettings.artworkIds
    .filter(ID => ID !== id)
    .sort((a, b) => 0.5 - Math.random()); // grab artworks, remove currently displayed one, and roughly shuffle them (shuffle apporach found online)
  const otherArtsArray = [];
  for (let i = 1; i <= 4; i++) {
    if (otherArts.length >= i)
      otherArtsArray.push(
        artworks.find(artwork => artwork.id === otherArts[i])
      );
  }

  const [zoomedIn, setZoomedIn] = useState(false);

  useScrollToTop();

  if (zoomedIn)
    return (
      <ImageStage
        onClose={() => setZoomedIn(false)}
        src={artwork.image}
        alt={artwork.name}
      />
    );

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container pt-20 py-32 mx-auto flex gap-14">
        <main>
          <img
            onClick={() => setZoomedIn(true)}
            className="mx-auto shadow-xl cursor-zoom-in mb-8"
            style={{ maxHeight: "70vh" }}
            src={artwork.image}
            alt={artwork.name}
          />

          <div className="relative">
            <button className="text-white absolute right-0">Fullscreen</button>

            <h1 className="text-white text-center text-2xl font-bold mb-1">
              {artwork.name}
            </h1>
            <p className="text-center text-gray-300 font mb-14">
              {artwork.summary}
            </p>
          </div>

          <section className="flex gap-8">
            <Link to={`/portfolio/${user.username}`} className="flex-none">
              <img
                className="shadow-xl w-24 h-24 object-cover rounded-sm mb-3 mx-auto"
                src={user.avatar}
                alt={user.name}
              />
              <p className="text-sm text-white text-center">by {user.name}</p>
            </Link>
            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                {artworkTags.map(tag => (
                  <p
                    key={tag.id}
                    className={`text-gray-900 cursor-pointer font-semibold text-xs bg-${tag.color} rounded-sm px-2 py-1`}
                  >
                    #{tag.label}
                  </p>
                ))}
              </div>
              <p className="text-gray-200 text-sm">{artwork.description}</p>
            </div>
          </section>
        </main>

        <aside className="flex-none">
          <h3 className="font-semibold text-white mb-8">
            More from {user.username}:
          </h3>
          <div className="mx-auto grid place-items-center gap-8">
            {otherArtsArray.map(artwork => (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="hover:bg-gray-800"
              >
                <img
                  className="shadow-lg w-36"
                  src={artwork.image}
                  alt={artwork.name}
                />
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
