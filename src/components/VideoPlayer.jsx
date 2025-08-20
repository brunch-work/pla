import { useState, useEffect } from "react";

import { Playbutton } from "./Playbutton";
import { PlusButton } from "./PlusButton";
import { getVideoUid } from "@/utils/getVideoUid";

export const VideoPlayer = ({
  originalVideoUrl,
  thumbnailUrl,
  title,
  description,
  publicationDate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [videoUrl, setVideoUrl] = useState(originalVideoUrl);
  const [videoId, setVideoId] = useState(getVideoUid(originalVideoUrl));

  useEffect(() => {
    setIsPlaying(false);
    setShowDescription(false);
    setVideoId(getVideoUid(originalVideoUrl));
    setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`);
  }, [originalVideoUrl]);

  const handlePlay = () => {
    setIsPlaying(true);
    setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
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
          onKeyDown={(e) => e.key === "Enter" && handlePlay()}
          tabIndex={0}
          role="button"
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
