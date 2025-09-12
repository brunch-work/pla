import ListPage from "@/components/pages/ListPage";
import { GET_DOCUMENTARIES } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import { Suspense } from "react";

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
