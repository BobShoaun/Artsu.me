const ArtsumeBanner = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 container flex">
        <div className="m-auto">
          <h1 className="text-white text-4xl font-bold p-5 -bg-gray-900 bg-opacity-10 backdrop-filter backdrop-blur-sm">
            Make your Artsume today
          </h1>
        </div>
      </div>
      <img
        className="max-h-72 object-cover w-full"
        src="http://res.cloudinary.com/artsu-me/image/upload/v1638819768/gyqgkurdoqnknin3yi4z.jpg"
        alt="low poly lighthouse"
      />
    </div>
  );
};

export default ArtsumeBanner;
