import ListPage from "@/components/pages/ListPage";
import { GET_SERIES } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import { Suspense } from "react";

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
