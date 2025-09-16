import { GET_POET_CONTENT, GET_SERIES_CONTENT, GET_INTERVIEW_CONTENT } from "@/gql/queries";
import { VideoPlayer } from "./VideoPlayer";

import Markdown from "react-markdown";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { SWRfetch } from "@/utils/client";

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
    query,
    (query, variables) => SWRfetch(query, { slug: activeItem })
  );

  useEffect(() => {
    if (data) {
      setPoet(data.poet.items[0]);
      setVideos(data.youtubeVideoCollection.items);
    }
  }, [activeItem, data]);

  if (isLoading) {
    return (
      <div className="poet grid-right">
        <div className="poet__info">
          <div className="img skeleton" />
        </div>
        <div className="poet__videos">
          <div className="video skeleton" />
          <div className="video skeleton" />
          <div className="video skeleton" />
          <div className="video skeleton" />
          <div className="video skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="poet grid-right">
      <div className="poet__info">
        {poet.photo && (
          <div className="img">
            <img src={poet.photo.url} alt={poet.title} className="poet__photo" />
          </div>
        )}
        {poet.bio && (
          <div className="bio">
            <Markdown>{poet.bio}</Markdown>
          </div>
        )}
      </div>
      <div className="poet__videos">
        {videos &&
          videos.map((video) => <VideoPlayer video={video} key={video._id} />)}
      </div>
    </div>
  );
};
