import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import { artworks } from "../artworks.json";

const ArtworkPage = () => {
  const { id } = useParams();
  const artwork = artworks.find(artwork => artwork.id === parseInt(id));
  const user = users.find(user => user.id === artwork.author_id);
  const otherArts = user.portfolioSettings.artworkIds.filter(ID => ID !== id).sort((a, b) => 0.5 - Math.random()) // grab artworks, remove currently displayed one, and roughly shuffle them (shuffle apporach found online)
  const extraArt1 = artworks.find(artwork => artwork.id === otherArts[1]);
  const extraArt2 = artworks.find(artwork => artwork.id === otherArts[2]);
  const extraArt3 = artworks.find(artwork => artwork.id === otherArts[3]);
  
  function likeButton(){
    console.log("clicked!")
    artwork.likes = artwork.likes + 1 // doesnt work, state stuff
  }
  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar/>
      <div className="container mx-auto px-5">
        <section className="py-10">
          <img
            className="mb-5 max-w-xlg mx-auto"
            src={artwork.image}
            alt={artwork.name}
          />
          <section className = "grid grid-cols-5">
            <button onClick ={likeButton} className="place-self-left mb-5 text-white text-center text-3xl text-left bg-rose-400 rounded-3xl w-max px-5 py-5">{artwork.likes} likes</button>
            <h1 className="place-self-center mb-5 text-white text-center text-5xl col-span-3">{artwork.name}</h1>
          </section>
        </section>
        <section className="flex">
          <Link
            to={`/portfolio/${user.slug}`}
            //key={user.slug}
          >
            <div className="container w-80">
              <img
                className="rounded-lg shadow-xl"
                src={user.avatar}
                alt={user.name}
              />
              <p className="text-xl text-white text-center">{user.name}</p>
            </div>
          </Link>
            <p className="text-white">{artwork.description_full}</p>
        </section>
          <h1 className="text-3xl text-white text-center">
            More from the Artist:
          </h1>
        <section className="py-10 grid grid-cols-3 gap-10 justify-items-center"> 
        <img
                className="rounded-lg shadow-xl h-100"
                src={extraArt1.image}
              />
        <img
                className="rounded-lg shadow-xl h-100"
                src={extraArt2.image}
              />
        <img
                className="rounded-lg shadow-xl h-100"
                src={extraArt3.image}
              />
        <h1 className="text-2xl text-white text-center">{extraArt1.name}</h1>
        <h1 className="text-2xl text-white text-center">{extraArt2.name}</h1>
        <h1 className="text-2xl text-white text-center">{extraArt3.name}</h1>
        <h1 className="place-self-left mb-5 text-white text-center text-3xl text-left bg-rose-400 rounded-3xl w-max px-5 py-5">{extraArt1.likes} likes</h1>
        <h1 className="place-self-left mb-5 text-white text-center text-3xl text-left bg-rose-400 rounded-3xl w-max px-5 py-5">{extraArt2.likes} likes</h1>
        <h1 className="place-self-left mb-5 text-white text-center text-3xl text-left bg-rose-400 rounded-3xl w-max px-5 py-5">{extraArt3.likes} likes</h1>

        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ArtworkPage;
