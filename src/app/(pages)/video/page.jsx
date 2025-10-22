import { getPropData } from "@/utils/client";
import { GET_VIDEO_CONTENT } from "@/gql/queries";
import { VideoPlayer } from "@/components/VideoPlayer";

export async function generateMetadata({ searchParams }) {
  const activeItem = (await searchParams).v;
  let title = "Video";
  let image = "/images/png/og-image.png";

  const data =
    activeItem && (await getPropData(GET_VIDEO_CONTENT, { activeItem }));

  if (data?.activeItem?.items[0]?.title) {
    title = data.activeItem.items[0].title;
    image = data.activeItem.items[0].thumbnail;
  }

  return {
    title,
    openGraph: {
      title,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: image.title,
        },
      ],
    },
    twitter: {
      title,
      images: [image.url],
    },
  };
}

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
