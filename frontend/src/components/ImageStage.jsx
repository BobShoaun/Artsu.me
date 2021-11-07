import { useState } from "react";
import { X } from "react-feather";

const ImageStage = ({ src, alt, onClose }) => {
  const [zoomedIn, setZoomedIn] = useState(false);

  return (
    <main className="bg-gray-900 z-30 min-w-screen min-h-screen flex">
      <X
        onClick={onClose}
        size={30}
        color="white"
        strokeWidth={3}
        className="fixed right-5 top-5 text-white cursor-pointer"
      />
      <img
        className={`m-auto shadow-2xl p-4 ${
          zoomedIn ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        style={
          zoomedIn
            ? {
                minWidth: "95vw",
                // minHeight: "95vh",
              }
            : {
                maxHeight: "95vh",
                maxWidth: "95vw",
              }
        }
        onClick={() => setZoomedIn(zoomed => !zoomed)}
        src={src}
        alt={alt}
      />
    </main>
  );
};

export default ImageStage;
