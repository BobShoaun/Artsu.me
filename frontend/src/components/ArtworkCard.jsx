import { Link } from "react-router-dom";

const ArtworkCard = ({ artwork, className }) => {
  return (
    <Link
      to={`/artwork/${artwork._id}`}
      key={artwork._id}
      className={`${className} hover:bg-gray-800 hover:-translate-y-2 transition-all transform rounded-md p-5 cursor-pointer hover:shadow-xl`}
    >
      <img className="h-52 mb-5 shadow-xl mx-auto" src={artwork.imageUrl} alt={artwork.name} />
      <div className="text-center mx-auto max-w-sm">
        <h2 className="dark:text-white text-lg font-semibold">{artwork.name}</h2>
        <p className="dark:text-gray-300 text-sm">{artwork.summary}</p>
      </div>
    </Link>
  );
};

export default ArtworkCard;
