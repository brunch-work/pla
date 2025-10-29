import {
  GET_POET_CONTENT,
  GET_SERIES_CONTENT,
  GET_INTERVIEW_CONTENT,
} from "@/gql/queries";
import { VideoPlayer } from "./VideoPlayer";
import { videoVariants, videosVariants, infoVariants } from "@/motion/poet.jsx";

import Markdown from "react-markdown";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { SWRfetch } from "@/utils/client";
import { motion, AnimatePresence } from "motion/react";

export const Poet = ({ activeItem, pageType }) => {
  let query;
  const [poet, setPoet] = useState({});
  const [videos, setVideos] = useState([]);

  if (pageType === "Poets") {
    query = GET_POET_CONTENT;
  } else if (pageType === "Series") {
    query = GET_SERIES_CONTENT;
  } else if (pageType === "Interview Hosts") {
    query = GET_INTERVIEW_CONTENT;
  }

  // fetch poet content
  const { data, error, mutate, isLoading } = useSWR(
    [query, activeItem],
    ([query, activeItem]) => SWRfetch(query, { slug: activeItem }),
  );

  useEffect(() => {
    if (data) {
      setPoet(data.poet.items[0]);
      setVideos(data.youtubeVideoCollection.items);
    }
  }, [data]);

  return (
    <AnimatePresence mode="wait">
      <div className="poet grid-right" key={poet._id}>
        {!isLoading && poet && poet._id && (
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
