import ListPage from "@/components/pages/ListPage";
import { GET_DOCUMENTARIES, GET_DOCUMENTARIES_LIST } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const { documentary } = await searchParams;
  const slug = documentary;
  let title = "Documentaries";
  let image = "/images/png/og-image.png";

  const { activeItem } = slug && (await getPropData(GET_DOCUMENTARIES_LIST, { activeItem: slug }));

  if (activeItem?.items?.[0]?.title) {
    title = activeItem.items[0].title;
    image = activeItem.items[0].thumbnail;
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

export default async function DocumentariesPage() {
  const { documentaries, documentariesIndex } = await getPropData(GET_DOCUMENTARIES);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage
        list={documentaries.items}
        pageDetails={documentariesIndex.items[0]}
        sidebarLabel="Documentaries"
        searchParam="documentary"
      />
    </Suspense>
  );
}
