import { Link, useParams } from "react-router-dom";

const ProjectSection = ({ portfolio, primary, secondary }) => {
  const layoutId = 0;
  const artworks = portfolio.section.project.artworks;

  // from stack overflow: https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
  const truncate = (str, n, useWordBoundary) => {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1); // the original check
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
  };

  const displayArtworks = () => {
    switch (layoutId) {
      case 0:
        return (
          <div className="flex flex-wrap items-center justify-evenly gap-x-8 gap-y-8">
            {artworks.map(artwork => (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={`project transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
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
            ))}
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            {artworks.map(artwork => (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={`flex items-center gap-7 bg-opacity-10 bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
              >
                <div className="w-1/4">
                  <img
                    className="shadow-xl max-h-72 mx-auto"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="dark:text-white text-xl font-semibold mb-0">{artwork.name}</h2>
                  <p className="dark:text-gray-300 mb-2">{artwork.summary}</p>
                  <p className="dark:text-gray-300 text-sm mb-3">
                    {truncate(artwork.description, 500, true)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            {artworks.map(artwork => (
              <Link
                to={`/artwork/${artwork.id}`}
                key={artwork.id}
                className={`flex items-center even:flex-row-reverse gap-7 bg-opacity-10 bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-5 cursor-pointer hover:shadow-xl`}
              >
                <div className="w-1/4">
                  <img
                    className="shadow-xl max-h-72 mx-auto"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="dark:text-white text-xl font-semibold mb-0">{artwork.name}</h2>
                  <p className="dark:text-gray-300 mb-2">{artwork.summary}</p>
                  <p className="dark:text-gray-300 text-sm mb-3">
                    {truncate(artwork.description, 500, true)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        );
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900" id="projects">
      <div className="container mx-auto">
        <h1 className="dark:text-white text-2xl font-semibold text-center mb-14 underline">
          My Projects
        </h1>
        {displayArtworks()}
      </div>
    </section>
  );
};

export default ProjectSection;
