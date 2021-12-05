import { Link, useParams } from "react-router-dom";

const ProjectSection = ({ portfolio, primary, secondary }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900" id="projects">
      <div className="container mx-auto">
        <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">My Projects</h1>
        <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-8">
          {portfolio.section.project.artworks.map(artwork => {
            return (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
              >
                <img
                  className="artwork mb-5 shadow-xl mx-auto"
                  src={artwork.imageUrl}
                  alt={artwork.name}
                />
                <div className="text-center">
                  <h2 className="dark:text-white text-lg font-semibold mb-1">{artwork.name}</h2>
                  <p className="dark:text-gray-300 text-sm mb-3">{artwork.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
