import { Link } from "react-router-dom";

const PortfolioPage = () => {
  return (
    <main className="dark:bg-gray-900 px-2">
      <section className="container mx-auto pb-20">
        <header className="flex items-center gap-10 py-10">
          <h1 className="dark:text-white text-3xl">Name Surname</h1>
          <Link className="ml-auto text-gray-200">Artworks</Link>
          <Link className="text-gray-200">Contact Me</Link>
          <Link className="text-gray-200">Follow</Link>
        </header>

        <div className="flex">
          <div>
            <h1 className="dark:text-white text-4xl mb-4">
              Welcome to my portfolio!
            </h1>
            <p className="dark:text-gray-300">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
