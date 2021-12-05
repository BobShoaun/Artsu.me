import { Link, useParams } from "react-router-dom";

const ExperienceSection = ({ portfolio, primary, secondary }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900" id="experiences">
      <div className="container mx-auto">
        <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">My Experiences</h1>
        <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-8">
          {portfolio.section.project.artworks.map(artwork => (
            <div key={artwork._id} className="flex items-center gap-10">
              <div className="flex-shrink flex-grow-0 w-1/3 ">
                <img className="max-h-56" src={artwork.imageUrl} alt={artwork.name} />
              </div>
              <div className="text-gray-100 flex-1">
                <h2 className="text-xl mb-2 font-semibold">{artwork.name}</h2>
                <p className="text-sm text-gray-300">{artwork.summary}</p>
                <p className="text-sm text-gray-300">{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
