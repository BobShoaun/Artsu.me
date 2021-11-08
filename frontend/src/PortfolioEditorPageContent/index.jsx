import { Link, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { users } from "../users.json";
import Footer from "../components/Footer";
import { artworks } from "../artworks.json";
import style from "./index.css"

const PortfolioEditorPageContent = () => {

  const { slug } = useParams();
  const user = users.find(user => user.slug === slug);
  
  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

const [SelectedArt, setSelectedArt] = useState(user.portfolioSettings.artworkIds);

function selectArt(artid){
    if (SelectedArt.includes(artid)){setSelectedArt(SelectedArt.filter(id => artid !== id))}
    else{setSelectedArt(SelectedArt.concat(artid))}
    return;
}


  return (
    <main className="bg-gray-700">
        
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
        <div className="container mx-auto flex item-center gap-10">
          <a><Link to="/" className="dark:text-white text-2xl font-semibold">artsu.me</Link></a>
          <a className="dark:text-white text-2xl ml-auto">Edit Portfolio - Content</a>
          <a className="dark:text-white text-l font-semibold ml-auto">Logout</a>
        </div>
      </header>
      <section className="dark:text-white my-10 ml-10">
        1. Hero Section
        <ul className="container mx-auto">
          <ul className="flex items-center gap-10 mx-auto pr-80 mb-6">
            <li color="white">
              <h3 className="dark:text-gray-200 font-semibold text-right">Heading:</h3>
            </li>
            <li className="ml-auto">
              <textarea rows="1" cols="100" >{user.portfolioSettings.heading}</textarea>
            </li>
          </ul>
          <ul className="flex items-center gap-10 mx-auto pr-80 mb-6">
            <li>
              <h3 className="dark:text-gray-200 font-semibold text-right">About Me:</h3>
            </li>
            <li className="ml-auto">
              <textarea rows="4" cols="100">{user.portfolioSettings.biography}</textarea>
            </li>
          </ul>
        </ul>
      </section>
      <section className="dark:text-white my-10 ml-10" id="chooseLayout">
       2. Choose Artworks to Display
        <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
          {user.portfolioSettings.artworkIds.map(id => {
            const artwork = artworks.find(artwork => artwork.id === id);
            return (
              <button
              onClick = {() => selectArt(id)} 
              key={artwork.id}
                className={SelectedArt.includes(id) ? `bg-gradient-to-br from-${primary.main} to-${secondary.main} transition-all rounded-lg p-7` : "hover:bg-gray-800 rounded-lg p-7"}
              >
                <img
                  className="mb-5 shadow-xl mx-auto"
                  src={artwork.image}
                  alt={artwork.name}
                />
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mb-1">{artwork.name}</h2>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <section className="my-5" id="buttons">
        <div className="flex container mx-auto">
          <div className="m-auto">
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">Upload New Artwork</button>
          </div>
        </div>
        <div className="text-left inline-block">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
            to={`/portfolio/${user.slug}`}
            >
              Quit
            </Link>
        </div>
        <div className="float-right inline-block">
          <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
          to={`/portfolio/edit/styles/${user.slug}`}
          >
            Next
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PortfolioEditorPageContent;
