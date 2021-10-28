import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";

const ArtworkPage = () => {
  const { id } = useParams();
  const artwork = artworks.find(artwork => artwork.id == id);
  const user = users.find(user => user.id === artwork.author_id)

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };
  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-5 px-5">
      <img
        className="mb-5 "
        src={artwork.image}
        alt={artwork.name}
        />
      <h1 className="mb-5 text-5xl text-white text-center">{artwork.name}</h1>
      <Link
        to={`/portfolio/${user.slug}`}
        //key={user.slug}

      >
      <div className = "container w-80 float-left">
      <img 
        className="rounded-lg shadow-xl"
        src={user.avatar}
        alt={user.name}
      />
        <p className = "text-xl text-white text-center">{user.name}</p>
      </div>
      </Link>
      <p className = "text-white">{artwork.description_full}</p>
      <h1 className="text-2xl text-white">More from the Artist:</h1>
      </div>
      <Footer />
    </main>
  );
};

export default ArtworkPage;
