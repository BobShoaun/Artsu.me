import "./index.css";

const ArtsumeModal = ({ children }) => {
  return (
    <main className="moving-gradient bg-gradient-to-br from-rose-300 to-teal-500 h-screen flex relative overflow-hidden">
      <h1 className="text-[13rem] text-white font-extrabold opacity-40 absolute translate-y-1/2 -top-1/2 inset-0 z-0 text-center">
        artsu.me
      </h1>

      <div className="appear backdrop-blur-sm absolute inset-0"></div>

      <section className="m-auto z-10 fade-up bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg max-w-2xl">
        {children}
      </section>
    </main>
  );
};

export default ArtsumeModal;
