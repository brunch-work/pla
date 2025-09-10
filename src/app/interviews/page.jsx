import ListPage from "@/components/pages/ListPage";
import { getPropData } from "@/utils/client";
import { GET_INTERVIEW_HOSTS } from "@/gql/queries";
import { Suspense } from "react";

export default async function InterviewsPage() {
  const {interviewHosts, interviewsIndex} = await getPropData(GET_INTERVIEW_HOSTS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage
        list={interviewHosts.items}
        pageDetails={interviewsIndex.items[0]}
        pageType="Interviews"
        searchParam="interview-host"
      />
    </Suspense>
  );
}
