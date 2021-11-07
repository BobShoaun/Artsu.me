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
  for (let i = 1; i <= 3; i++) {
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
      <div className="container mx-auto">
        <section className="py-20 mx-auto">
          <img
            onClick={() => setZoomedIn(true)}
            className="mx-auto shadow-xl max-h-96 cursor-zoom-in"
            src={artwork.image}
            alt={artwork.name}
          />
          <h1 className="text-white text-center text-5xl">{artwork.name}</h1>
        </section>
        <section className="flex gap-x-10 px-5 py-20">
          <Link
            to={`/portfolio/${user.slug}`}
            className={"hover:bg-gray-800 flex-none w-40"}
          >
            <img
              className="rounded-lg shadow-xl"
              src={user.avatar}
              alt={user.name}
            />
            <p className="text-xl text-white text-center">{user.name}</p>
          </Link>
          <div>
            <p className="text-white">{artwork.description_full}</p>
            <div className="flex flex-wrap gap-3 pt-5">
              <p className="text-white text-2xl mr-5">Tags:</p>
              {artworkTags.map(tag => (
                <p
                  className={`text-gray-700 cursor-pointer font-semibold text-sm bg-${tag.color} rounded-sm px-2 py-1`}
                >
                  #{tag.label}
                </p>
              ))}
            </div>
          </div>
        </section>
        <h1 className="text-3xl text-white text-center">
          More from the Artist:
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-10 py-10 container">
          {otherArtsArray.map(artwork => {
            return (
              <Link
                to={`/artwork/${artwork.id}`}
                className={"hover:bg-gray-800"}
              >
                <img
                  style={{ maxWidth: "20em" }}
                  className="mb-5 shadow-xl mx-auto"
                  src={artwork.image}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mb-1">
                    {artwork.name}
                  </h2>
                  <p className="dark:text-gray-300 text-sm mb-3">
                    {artwork.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ArtworkPage;
