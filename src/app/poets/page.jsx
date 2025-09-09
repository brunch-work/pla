import DefaultPage from "@/components/pages/DefaultPage";
import { getPropData } from "@/utils/client";
import { GET_POETS } from "@/gql/queries";
import { Suspense } from "react";

export default async function PoetsPage() {
  const { poets, poetsIndex } = await getPropData(GET_POETS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultPage
        list={poets.items}
        pageDetails={poetsIndex.items[0]}
        pageType="poets"
        searchParam="poet"
      />
    </Suspense>
  );
}
