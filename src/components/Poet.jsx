import {
  GET_POET_CONTENT,
  GET_SERIES_CONTENT,
  GET_INTERVIEW_CONTENT,
} from "@/gql/queries";
import { VideoPlayer } from "./VideoPlayer";
import { videoVariants, videosVariants, infoVariants } from "@/motion/poet.jsx";
import { usePreloader } from "@/hooks/usePreloader";

import Markdown from "react-markdown";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { SWRfetch } from "@/utils/client";
import { motion, AnimatePresence } from "motion/react";

export const Poet = ({ activeItem, pageType }) => {
  let query;
  const [poet, setPoet] = useState({});
  const [videos, setVideos] = useState([]);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  if (pageType === "Poets") {
    query = GET_POET_CONTENT;
  } else if (pageType === "Series") {
    query = GET_SERIES_CONTENT;
  } else if (pageType === "Interview Hosts") {
    query = GET_INTERVIEW_CONTENT;
  }

  const { data, error, mutate, isLoading } = useSWR(
    [query, activeItem],
    ([query, activeItem]) => SWRfetch(query, { slug: activeItem }),
  );

  useEffect(() => {
    if (data && data.poet?.items?.[0]) {
      const newPoet = data.poet.items[0];
      const newVideos = data.youtubeVideoCollection?.items || [];

      setPoet(newPoet);
      setVideos(newVideos);
      setMediaLoaded(false);
      setLoadProgress(0);

      const assets = [];

      if (newPoet.photo) {
        assets.push({ thumbnail: { url: newPoet.photo.url } });
      }

      if (newVideos && newVideos.length > 0) {
        newVideos.forEach((video) => {
          if (video.thumbnail?.url) {
            assets.push(video);
          }
        });
      }

      if (assets.length > 0) {
        usePreloader(assets, (progress) => {
          setLoadProgress(progress);
          if (progress === 100) {
            setMediaLoaded(true);
          }
        });
      } else {
        setMediaLoaded(true);
      }
    }
  }, [data]);

  return (
    <AnimatePresence mode="wait">
      <div className="poet grid-right" key={poet._id}>
        {!isLoading && poet && poet._id && mediaLoaded && (
          <motion.div className="poet__info" {...infoVariants}>
            {poet.photo && (
              <div className="img">
                <img
                  src={poet.photo.url}
                  alt={poet.title}
                  className="poet__photo"
                />
              </div>
            )}
            {poet.bio && (
              <div className="bio">
                <Markdown>{poet.bio}</Markdown>
              </div>
            )}
          </motion.div>
        )}
        {!isLoading && videos && videos.length > 0 && (
          <motion.div
            key={poet._id}
            className="poet__videos"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={videosVariants}
          >
            {videos.map((video) => (
              <motion.div
                key={video._id}
                className="video"
                variants={videoVariants}
              >
                <VideoPlayer video={video} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
