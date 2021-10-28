import "./index.css";

const ArtsumeModal = ({ children }) => {
  return (
    <main className="moving-gradient bg-gradient-to-br from-rose-300 to-teal-500 min-h-screen flex relative overflow-hidden">
      <h1
        style={{ fontSize: "13rem" }}
        className="text-white text-9xl font-bold opacity-40 absolute top-52 inset-0 z-0 text-center"
      >
        artsu.me
      </h1>

      <div className="backdrop-filter appear backdrop-blur-sm absolute inset-0"></div>

      <section className="m-auto z-10 fade-up  bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-md px-14 py-12 shadow-2xl rounded-lg max-w-xl">
        {children}
      </section>
    </main>
  );
};

export default ArtsumeModal;
