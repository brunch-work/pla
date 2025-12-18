"use client";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";

import { Playbutton } from "./Playbutton";
import { PlusButton } from "./PlusButton";
import { getVideoUid } from "@/utils/getVideoUid";
import { useMobile } from "@/hooks/useMobile";
import { AnimatePresence, motion } from "motion/react";
import { videoPlayerVariants } from "@/motion/videoplayer";

export const VideoPlayer = ({ video, index }) => {
  const { videoUrl, thumbnail, title, description, publicationDate } = video;

  const [isPlaying, setIsPlaying] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [videoPlayerUrl, setVideoPlayerUrl] = useState(videoUrl);
  const [videoId, setVideoId] = useState(getVideoUid(videoUrl));
  const isMobile = useMobile();

  const date = publicationDate ? new Date(publicationDate) : null;

  useEffect(() => {
    setIsPlaying(false);
    setShowDescription(false);
    setVideoId(getVideoUid(videoUrl));
    setVideoPlayerUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`,
    );
  }, [videoUrl]);

  const handlePlay = () => {
    setIsPlaying(true);
    setVideoPlayerUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
    );
  };

  if (isMobile) {
    return (
      <div className="video-player">
        <div className="video">
          {videoPlayerUrl && isPlaying && (
            <iframe
              src={videoPlayerUrl}
              alt=""
              allow="autoplay"
              allowFullScreen
              title={title}
            />
          )}
          <div
            className={`overlay ${isPlaying ? "playing" : ""}`}
            onClick={() => handlePlay()}
            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
            tabIndex={0}
            role="button"
          >
            <img
              src={`/images/png/image${index}.png`}
              alt={thumbnail.description}
            />
            <Playbutton handlePlay={handlePlay} title={title} />
          </div>
          <div className="underlay"></div>
        </div>
        <div className="info">
          <div className="top">
            <button
              className={`title ${description ? "active" : ""}`}
              onClick={() =>
                description && setShowDescription(!showDescription)
              }
              aria-label="Toggle video description"
              aria-expanded={showDescription}
            >
              <div className="title__title body-text">
                <h3>{title}</h3>
                {description && <PlusButton isActive={showDescription} />}
              </div>
            </button>
            {date && (
              <span className="date">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: isMobile ? "medium" : "long",
                }).format(date)}
              </span>
            )}
          </div>
          <div className={`description ${showDescription ? "show" : ""}`}>
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`video-player ${showDescription ? "show-description" : ""}`}
    >
      <div className="video">
        {videoPlayerUrl && isPlaying && (
          <iframe
            src={videoPlayerUrl}
            alt=""
            allow="autoplay"
            allowFullScreen
            title={title}
          />
        )}
        <div className={`overlay ${isPlaying ? "playing" : ""}`}>
          <div className="progressive-blur"></div>
          <img
            src={`/images/png/image${index}.png`}
            alt={thumbnail.description || ""}
          />
          <Playbutton handlePlay={handlePlay} title={title} />
          <div className="info">
            <div className="top">
              <button
                className={`title ${description ? "active" : ""}`}
                onClick={() =>
                  description && setShowDescription(!showDescription)
                }
                aria-label="Toggle video description"
                aria-expanded={showDescription}
              >
                <div className="title__title body-text">
                  {description && (
                    <PlusButton isActive={showDescription} color="#fff" />
                  )}
                  <h3>{title}</h3>
                </div>
              </button>
              {date && (
                <span className="date body-text">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: isMobile ? "medium" : "long",
                  }).format(date)}
                </span>
              )}
            </div>
            <AnimatePresence>
              {showDescription && (
                <motion.div
                  className="description show"
                  variants={videoPlayerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Markdown>{description}</Markdown>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="underlay"></div>
      </div>
    </div>
  );
};
