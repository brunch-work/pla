import ListPage from "@/components/pages/ListPage";
import { getPropData } from "@/utils/client";
import { GET_POETS_INDEX, GET_POETS, GET_POET_CONTENT } from "@/gql/queries";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const { poet } = await searchParams;
  const slug = poet;
  let title = "Poets";
  let image = "/images/png/og-image.png";

  const data = await getPropData(GET_POET_CONTENT, { slug });

  if (data.poet.items[0].title) {
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
    }
  };
}

export default async function PoetsPage() {

  const { poetsIndex } = await getPropData(GET_POETS_INDEX);
  const { poets } = await getPropData(GET_POETS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage
        list={poets.items}
        pageDetails={poetsIndex.items[0]}
        sidebarLabel="Poets"
        searchParam="poet"
      />
    </Suspense>
  );
}
