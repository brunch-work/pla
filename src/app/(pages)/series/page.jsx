import ListPage from "@/components/pages/ListPage";
import { GET_SERIES, GET_SERIES_CONTENT } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const { series } = await searchParams;
  const slug = series;
  let title = "Series";
  let image = "/images/png/og-image.png";

  const data = slug && (await getPropData(GET_SERIES_CONTENT, { slug }));

  if (data?.poet?.items[0]?.title) {
    title = data.poet.items[0].title;
    image = data.poet.items[0].photo;
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

export default async function SeriesPage() {
  const { series, seriesIndex } = await getPropData(GET_SERIES);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage
        list={series.items}
        pageDetails={seriesIndex.items[0]}
        sidebarLabel="Series"
        searchParam="series"
      />
    </Suspense>
  );
}
