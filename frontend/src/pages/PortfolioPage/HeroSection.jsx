import { defaultAvatarUrl } from "../../config";
const HeroSection = ({ portfolio }) => {
  const layoutId = portfolio.section.hero.layoutId ?? 2;

  const displayHero = () => {
    switch (layoutId) {
      case 0:
      case 1:
        return (
          <div
            className={`flex items-center ${
              layoutId === 0 ? "flex-row" : "flex-row-reverse"
            } justify-around gap-10 min-h-screen`}
          >
            <div>
              <h1 className="dark:text-white font-bold text-4xl mb-4">
                {portfolio.section.hero.heading}
              </h1>
              <p className="dark:text-gray-300 text-sm">{portfolio.section.hero.subtitle}</p>
            </div>
            <div className="relative avatar-wrapper">
              <div
                className={`absolute bg-primary-gradient -top-8 -left-8 w-24 h-24 rounded-lg shadow-lg`}
              ></div>
              <img
                className="rounded-lg shadow-xl z-10 relative"
                src={portfolio.user.avatarUrl || defaultAvatarUrl}
                onError={e => (e.target.src = defaultAvatarUrl)}
                alt={`${portfolio.user.name} avatar`}
              />
              <div
                className={`absolute bg-secondary-gradient -bottom-8 -right-8 w-24 h-24 rounded-lg shadow-lg`}
              ></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex min-h-screen">
            <div className="m-auto">
              <div className="relative mb-20 mx-auto max-w-max">
                <div
                  className={`absolute bg-primary-gradient -top-8 -left-8 w-24 h-24 rounded-lg shadow-lg`}
                ></div>
                <img
                  className="rounded-lg shadow-xl z-10 relative h-60 mt-10"
                  src={portfolio.user.avatarUrl}
                  alt={`${portfolio.user.name} avatar`}
                />
                <div
                  className={`absolute bg-secondary-gradient -bottom-8 -right-8 w-24 h-24 rounded-lg shadow-lg`}
                ></div>
              </div>
              <div className="text-center">
                <h1 className="dark:text-white font-bold text-4xl mb-4">
                  {portfolio.section.hero.heading}
                </h1>
                <p className="dark:text-gray-300 text-sm">{portfolio.section.hero.subtitle}</p>
              </div>
            </div>
          </div>
        );
      default:
        console.log("bad layout id");
    }
  };

  return (
    <section id="main" className="container mx-auto">
      {displayHero()}
    </section>
  );
};

export default HeroSection;
