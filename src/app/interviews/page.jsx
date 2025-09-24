import ListPage from "@/components/pages/ListPage";
import { getPropData } from "@/utils/client";
import { GET_INTERVIEW_HOSTS, GET_INTERVIEW_CONTENT } from "@/gql/queries";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const { "interview-host": interviewHost } = await searchParams;
  const slug = interviewHost;
  let title = "Interviews";
  let image = "/images/png/og-image.png";

  const data = slug && (await getPropData(GET_INTERVIEW_CONTENT, { slug }));

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

export default async function InterviewsPage() {
  const {interviewHosts, interviewsIndex} = await getPropData(GET_INTERVIEW_HOSTS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage
        list={interviewHosts.items}
        pageDetails={interviewsIndex.items[0]}
        sidebarLabel="Interview Hosts"
        searchParam="interview-host"
      />
    </Suspense>
  );
}
