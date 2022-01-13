import "./index.css";

const ArtsumeModal = ({ children }) => {
  return (
    <main className="moving-gradient bg-gradient-to-br from-rose-300 to-teal-500 h-screen flex relative overflow-hidden">
      {/* <h1 className="text-[13rem] text-white font-extrabold opacity-40 absolute translate-y-1/2 -top-1/2 inset-0 z-0 text-center">
        artsu.me
      </h1> */}

      {/* <div className="appear backdrop-blur-sm absolute inset-0"></div> */}

      <div className="m-auto z-10 fade-up max-h-screen foverflow-auto absolute fleft-1/2">
        {children}
      </div>
    </main>
  );
};

export default ArtsumeModal;
