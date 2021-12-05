const HeroSection = ({ portfolio, primary, secondary }) => {
  return (
    <section
      id="main"
      className="flex items-center justify-around gap-10 pb-20 min-h-screen container mx-auto"
    >
      <div>
        <h1 className="dark:text-white font-bold text-4xl mb-4">
          {portfolio.section.hero.heading}
        </h1>
        <p className="dark:text-gray-300 text-sm">{portfolio.section.hero.subtitle}</p>
      </div>
      <div className="relative avatar-wrapper">
        <div
          className={`absolute -top-8 -left-8 w-24 h-24 rounded-lg shadow-lg bg-gradient-to-br from-${primary.light} to-${primary.dark}`}
        ></div>
        <img
          className="rounded-lg shadow-xl z-10 relative"
          src={portfolio.user.avatarUrl}
          alt={`${portfolio.user.name} avatar`}
        />
        <div
          className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-lg shadow-lg bg-gradient-to-br from-${secondary.light} to-${secondary.dark}`}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
