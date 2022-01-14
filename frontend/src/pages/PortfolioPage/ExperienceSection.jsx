import { Link } from "react-router-dom"; // removed useParams

const ExperienceSection = ({ portfolio }) => {
  const experiences = portfolio.section.experience.experiences;

  const layoutId = portfolio.section.experience.layoutId ?? 0;

  const displayExperience = experience => {
    switch (layoutId) {
      case 0:
        return (
          <div key={experience._id} className="">
            <div className="text-white flex-1 mb-5">
              <h2 className="text-xl mb-2 font-semibold">
                <span className="text-gray-300">{experience.position} @ </span>
                {experience.company}
              </h2>
              <p className="text-sm text-gray-300 px-5">{experience.description}</p>
            </div>
            <h2 className="text-gray-100 text-md italic mb-2">Related Artworks:</h2>
            <div className="grid grid-cols-2 gap-6">
              {experience.artworks?.map(artwork => (
                <Link
                  to={`/artwork/${artwork._id}`}
                  key={artwork._id}
                  className="flex bg-gray-700 p-5 rounded-md shadow-md gap-4"
                >
                  <div className="">
                    <img className="h-32 w-auto" src={artwork.imageUrl} alt={artwork.name} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg mb-1 font-semibold text-gray-100">{artwork.name}</h2>
                    <p className="text-sm text-gray-300">{artwork.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div key={experience._id} className="flex gap-5">
            <div className="text-white flex-1 mb-5">
              <h2 className="text-xl mb-2 font-semibold">
                <span className="text-gray-300">{experience.position} @ </span>
                {experience.company}
              </h2>
              <p className="text-sm text-gray-300 px-5">{experience.description}</p>
            </div>
            <div>
              <h2 className="text-gray-100 text-md italic mb-2">Related Artworks:</h2>
              <div className="space-y-4">
                {experience.artworks?.map(artwork => (
                  <Link
                    to={`/artwork/${artwork._id}`}
                    key={artwork._id}
                    className="flex bg-gray-700 p-5 rounded-md shadow-md gap-4"
                  >
                    <div className="">
                      <img className="h-28 w-auto" src={artwork.imageUrl} alt={artwork.name} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg mb-1 font-semibold text-gray-100">{artwork.name}</h2>
                      <p className="text-sm text-gray-300">{artwork.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        console.log("bad layout id");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900" id="experiences">
      <div className="container mx-auto">
        <h1 className="dark:text-white text-2xl font-semibold text-center mb-14 underline">
          My Experiences
        </h1>
        <div className="space-y-20">
          {experiences.map(experience => displayExperience(experience))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
