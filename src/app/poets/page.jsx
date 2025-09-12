import ListPage from "@/components/pages/ListPage";
import { getPropData } from "@/utils/client";
import { GET_POETS_INDEX, GET_POETS } from "@/gql/queries";
import { Suspense } from "react";

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
