import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";
import { useScrollToTop } from "../hooks/useScrollToTop";

const AdminArtworkViewer = () => {
  const { id } = useParams();
  const artwork = artworks.find(artwork => artwork.id === parseInt(id));
  const user = users.find(user => user.id === artwork.author_id);
  
  const otherArts = user.portfolioSettings.artworkIds.filter(ID => ID !== id).sort((a, b) => 0.5 - Math.random()) // grab artworks, remove currently displayed one, and roughly shuffle them (shuffle apporach found online)
  const otherArtsArray = []
  for(let i = 1; i <= 3; i++){
    if (otherArts.length >= i) otherArtsArray.push(artworks.find(artwork => artwork.id === otherArts[i]))
  }

  useScrollToTop();

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar/>
      <div className="container mx-auto px-5">
          <img className="pt-10 mb-5 max-w-xlg mx-auto"
            src={artwork.image}
            alt={artwork.name}
          />
          <h1 className="place-self-center mb-5 text-white text-center text-5xl col-span-3">{artwork.name}</h1>
          <section className="flex gap-x-10 px-5">
          <Link to={`/admin/${user.username}`} className={"hover:bg-gray-800 flex-none w-40"}>
            <img className="rounded-lg shadow-xl"
              src={user.avatar}
              alt={user.name}
            />
            <p className="text-xl text-white text-center">{user.name}</p>
          </Link>
          <p className="text-white">{artwork.description_full}</p>

        </section>
        <div className="text-right mb-10 mx-auto">
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                Ban Artwork
            </button>
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                Remove Description
            </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminArtworkViewer;
