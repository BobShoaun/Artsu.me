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

  if (artwork.type === "video/mp4") {
    return (
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
    );
  } else if (artwork.type === "image") {
    return (
      <img
        className="shadow-xl object-scale-down w-full h-full rounded-t-lg"
        src={artwork.external_link}
        alt={artwork.name}
      />
    );
  }
}

export default NFThumb;
