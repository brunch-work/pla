import { getPropData } from "@/utils/client";
import { GET_VIDEO_CONTENT } from "@/gql/queries";
import { VideoPlayer } from "@/components/VideoPlayer";

export default async function VideoPage({ searchParams }) {
  const activeItem = (await searchParams).v;
  const res = await getPropData(GET_VIDEO_CONTENT, { activeItem });

  return (
    <main className="list-page page subgrid">
      <div className="main-content">
        <VideoPlayer video={res.activeItem.items[0]} />
      </div>
    </main>
  );
}
