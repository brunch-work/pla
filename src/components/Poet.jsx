import { GET_POET_VIDEOS } from "@/gql/queries";
import { VideoPlayer } from "./VideoPlayer";

import Markdown from "react-markdown";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { SWRfetch } from "@/utils/client";

export const Poet = ({ poet }) => {

  const { data, error, mutate, isLoading } = useSWR(GET_POET_VIDEOS, (query, variables) =>
    SWRfetch(query, { poetSlug: poet.slug })
  );

  useEffect(() => {
    if (data) {
      mutate({ ...data, poetSlug: poet.slug });
    }
  }, [poet.slug]);

  if (isLoading) {
    return (
      <div className="poet grid-right">
        <div className="poet__info">
          <div className="img skeleton"/>
        </div>
        <div className="poet__videos">
          <div className="video skeleton"/>
          <div className="video skeleton"/>
          <div className="video skeleton"/>
          <div className="video skeleton"/>
          <div className="video skeleton"/>
        </div>
      </div>
    );
  }

  return (
    <div className="poet grid-right">
      <div className="poet__info">
        {poet.photo && (
          <div className="img">
            <img src={poet.photo.url} alt={poet.name} className="poet__photo" />
          </div>
        )}
        {poet.bio && (
          <div className="bio">
            <Markdown>{poet.bio}</Markdown>
          </div>
        )}
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
