import { Link } from "react-router-dom";

const ArtworkPreview = ({ artwork, primary, secondary }) => {
  return (
    <Link
      to={`/artwork/${artwork._id}`}
      key={artwork._id}
      className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
    >
      <img
        className="artwork mb-5 shadow-xl mx-auto"
        src={artwork.imageUrl ?? artwork.image} // to keep old one working
        alt={artwork.name}
      />
      <div className="text-center">
        <h2 className="dark:text-white text-lg font-semibold mb-1">{artwork.name}</h2>
        <p className="dark:text-gray-300 text-sm mb-3">{artwork.summary}</p>
      </div>
    </Link>
  );
};

export default ArtworkPreview;
