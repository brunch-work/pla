import { useState, useEffect } from "react";

import { Playbutton } from "./Playbutton";
import { PlusButton } from "./PlusButton";

export const VideoPlayer = ({
  videoUid,
  thumbnailUrl,
  title,
  description,
  publicationDate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    setIsPlaying(false);
    setShowDescription(false);
    setVideoUrl(`//www.youtube.com/embed/${videoUid}?autoplay=0&rel=0`);
  }, [videoUid]);

  const handlePlay = () => {
    setIsPlaying(true);
    setVideoUrl(`//www.youtube.com/embed/${videoUid}?autoplay=1&rel=0`);
  };

  return (
    <div className="video-player">
      <div className="video">
        {videoUrl && (
          <iframe
            src={videoUrl}
            alt=""
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        )}
        <div
          className={`overlay ${isPlaying ? "playing" : ""}`}
          onClick={() => handlePlay()}
        >
          <img src={thumbnailUrl} alt={title} />
          <Playbutton />
        </div>
      </div>
      <div className="info">
        <div className="top">
          <div
            className="title"
            onClick={() => setShowDescription(!showDescription)}
          >
            <h3>{title}</h3>
            <PlusButton isActive={showDescription} />
          </div>
          <span>{publicationDate}</span>
        </div>
        {showDescription && (
          <div className="description">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
