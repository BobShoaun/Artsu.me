import { useState, useRef } from "react";

import { PlayCircle, PauseCircle } from "react-feather";

const NFThumb = ({ artwork }) => {

  const vidRef = useRef(null);

  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
      if (playing) {
          vidRef.current.pause();
          setPlaying(false);
      } else {
          vidRef.current.play();
          setPlaying(true);
      }

  }

  return (
      <div
        key={artwork.id}
        className={`transition-all bg-gray-800 rounded-lg w-72 shadow-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-transform transform`}
      >
        <div className="h-72 mb-4">

          {/* Video NFTs */}

          {artwork.type === "video/mp4" &&
            <div className="relative">
              {playing ?
                <PauseCircle
                  size={40}
                  color="black"
                  className={`absolute right-2 bottom-2 stroke-1 z-10`}
                  onClick={() => togglePlay()}
                />
              :
                <PlayCircle
                  size={40}
                  color="black"
                  className={`absolute right-2 bottom-2 stroke-1 z-10`}
                  onClick={() => togglePlay()}
                />
              }
              <video
                ref={vidRef}
                autoPlay={true}
                loop={true}
                className="shadow-xl object-scale-down w-full h-full rounded-t-lg"
                src={artwork.external_link}
                alt={artwork.name}
              >
                <source src="movie.mp4" type="video/mp4"/>
              </video>
            </div>
          }

          {/* Image NFTs */}

          {artwork.type === "image" &&
            <img
              className="shadow-xl object-scale-down w-full h-full rounded-t-lg"
              src={artwork.external_link}
              alt={artwork.name}
            />
          }
          </div>

          {/* Card Footer */}

          <div className="text-center">
          <h2 className="float-left ml-4 dark:text-white text-lg font-semibold mb-1">{artwork.name}</h2>
          <p className="float-right mr-4 flex dark:text-gray-300 mb-4">
            <img src="/icons/ethereum logo.svg" className="h-5 dark:brightness-200" alt="eth logo" />
            <span className="ml-2 text-md">{artwork.floor}</span>
          </p>
        </div>
      </div>
    )
}

export default NFThumb;
