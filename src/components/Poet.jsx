import Markdown from "react-markdown";
import useSWR from "swr";
import { useEffect } from "react";

import { SWRfetch } from "@/utils/client";
import { GET_POET_VIDEOS } from "@/gql/queries";
import { VideoPlayer } from "./VideoPlayer";

export const Poet = ({ poet }) => {
  const { data, error, mutate } = useSWR(GET_POET_VIDEOS, (query, variables) =>
    SWRfetch(query, { poetSlug: poet.slug })
  );

  useEffect(() => {
    if (data) {
      mutate({...data, poetSlug: poet.slug});
    }
  }, [poet.slug]);

  return (
    <div className="poet grid-right">
      <div className="poet__info">
        {poet.photo && (
          <img src={poet.photo.url} alt={poet.name} className="poet__photo" />
        )}
        {poet.bio && <Markdown>{poet.bio}</Markdown>}
      </div>
      <div className="poet__videos">
        {data?.youtubeVideoCollection?.items.map((video) => (
          <VideoPlayer
            key={video._id}
            originalVideoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnail.url}
            title={video.title}
            description={video.description}
            publicationDate={video.publicationDate}
          />
        ))}
      </div>
    </div>
  );
};
