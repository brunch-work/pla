import DefaultPage from "@/components/pages/DefaultPage";
import { getPropData } from "@/utils/client";
import { GET_INTERVIEW_HOSTS } from "@/gql/queries";
import { Suspense } from "react";

export default async function InterviewsPage() {
  const {interviewHosts, interviewsIndex} = await getPropData(GET_INTERVIEW_HOSTS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultPage
        list={interviewHosts}
        pageDetails={interviewsIndex}
        pageType="interviews"
        searchParam="interview"
      />
    </Suspense>
  );
}
