import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
//replace with API call in phase 2
import { users } from "../users.json";
//replace with API call in phase 2

import { X } from "react-feather";

import { artworks } from "../artworks.json";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useAuthentication } from "../hooks/useAuthentication";
import { tags } from "../tags.json";

const AdminArtworkViewer = () => {
  const { id } = useParams();
  //replace with API call in phase 2
  const artwork = artworks.find(artwork => artwork.id === parseInt(id));
  //replace with API call in phase 2
  const user = users.find(user => user.id === artwork.authorId);
  const { user: adminUser } = useAuthentication();
  const artworkTags = [];
  artwork.tagIds.forEach(tagid => {
    artworkTags.push(tags.find(tag => tag.id === tagid));
  });

  const otherArts = user.portfolioSettings.artworkIds
    .filter(ID => ID !== id)
    .sort((a, b) => 0.5 - Math.random()); // grab artworks, remove currently displayed one, and roughly shuffle them (shuffle apporach found online)
  const otherArtsArray = [];
  for (let i = 1; i <= 3; i++) {
    if (otherArts.length >= i)
      otherArtsArray.push(artworks.find(artwork => artwork.id === otherArts[i]));
  }

  useScrollToTop();

  //phase2: create method here for API call to update artwork and/or tags

  if (adminUser.isAdmin) {
    return (
      <main className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-5">
          <img className="pt-10 mb-5 max-w-xlg mx-auto" src={artwork.image} alt={artwork.name} />
          <h1 className="place-self-center mb-5 text-white text-center text-5xl col-span-3">
            {artwork.name}
          </h1>
          <p className="text-center text-gray-300 font mb-14">{artwork.summary}</p>
          <section className="flex gap-x-10 px-5">
            <Link to={`/admin/${user.username}`} className={"hover:bg-gray-800 flex-none w-40"}>
              <img className="rounded-lg shadow-xl" src={user.avatar} alt={user.name} />
              <p className="text-xl text-white text-center">{user.name}</p>
            </Link>
            <div>
              {artworkTags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-5 items-center">
                  {artworkTags.map(tag => (
                    <p
                      key={tag.id}
                      className={`flex gap-3 items-center text-gray-900 cursor-pointer font-semibold text-xs bg-${tag.color} rounded-sm px-2 py-1`}
                    >
                      #{tag.label}
                      <X size={20} color="white" strokeWidth={3} className="cursor-pointer" />
                    </p>
                  ))}
                </div>
              )}
              <p className="text-gray-200 text-sm">{artwork.description}</p>
            </div>
          </section>
          <div className="text-right mb-10 mx-auto">
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
              Ban Artwork
            </button>
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
              Remove Summary
            </button>
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
              Remove Description
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  } else {
    return (
      <main className="dark:bg-gray-900">
        <Navbar />
        <h1 className="dark:text-white text-2xl font-semibold text-center py-5 min-h-screen">
          403 Unauthorized
        </h1>
        <Footer />
      </main>
    );
  }
};

export default AdminArtworkViewer;
