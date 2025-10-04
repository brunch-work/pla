import { useState, useEffect } from "react";

import { Playbutton } from "./Playbutton";
import { PlusButton } from "./PlusButton";
import { getVideoUid } from "@/utils/getVideoUid";
import { useMobile } from "@/hooks/useMobile";
import { AnimatePresence, motion } from "motion/react";
import { videoPlayerVariants } from "@/motion/videoplayer";

export const VideoPlayer = ({ video }) => {
  const { videoUrl, thumbnail, title, description, publicationDate } = video;

  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [videoPlayerUrl, setVideoPlayerUrl] = useState(videoUrl);
  const [videoId, setVideoId] = useState(getVideoUid(videoUrl));
  const isMobile = useMobile();

  const date = new Date(publicationDate);

  useEffect(() => {
    setIsPlaying(false);
    setShowDescription(false);
    setVideoId(getVideoUid(videoUrl));
    setVideoPlayerUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
    );
  }, [videoUrl]);

  const handlePlay = () => {
    setIsPlaying(true);
    setVideoPlayerUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    );
  };

  if (isMobile) {
    return (
      <div className="video-player">
        <div className="video">
          {videoPlayerUrl && (
            <iframe
              src={videoPlayerUrl}
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
            <img src={thumbnail.url} alt={thumbnail.description} />
            <Playbutton handlePlay={handlePlay} title={title} />
          </div>
        </div>
        <div className="info">
          <div className="top">
            <button
              className={`title ${description ? "active" : ""}`}
              onClick={() =>
                description && setShowDescription(!showDescription)
              }
              aria-label="Toggle video description"
              aria-expanded={description}
            >
              <div className="title__title">
                <h3>{title}</h3>
                {description && <PlusButton isActive={showDescription} />}
              </div>
            </button>
            <span className="date">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: isMobile ? "medium" : "long",
              }).format(date)}
            </span>
          </div>
          <div className={`description ${showDescription ? "show" : ""}`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player">
      <div className="video">
        {videoPlayerUrl && (
          <iframe
            src={videoPlayerUrl}
            alt=""
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        )}
        <div className={`overlay ${isPlaying ? "playing" : ""}`}>
          <div className="progressive-blur">
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
            <div
              className="blur"
              style={{ backgroundImage: `url(${thumbnail.url})` }}
            ></div>
          </div>
          <img src={thumbnail.url} alt={thumbnail.description || ""} />
          <Playbutton handlePlay={handlePlay} title={title} />
          <div className="info">
            <div className="top">
              <button
                className={`title ${description ? "active" : ""}`}
                onClick={() =>
                  description && setShowDescription(!showDescription)
                }
                aria-label="Toggle video description"
                aria-expanded={description}
              >
                <div className="title__title">
                  <h3>{title}</h3>
                  {description && <PlusButton isActive={showDescription} color="#fff" />}
                </div>
              </button>
              <span className="date body-text">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: isMobile ? "medium" : "long",
                }).format(date)}
              </span>
            </div>
            <AnimatePresence>
              {showDescription && (
                <motion.div className="description show" variants={videoPlayerVariants} initial="hidden" animate="visible" exit="hidden">
                  <p className="body-text">{description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
