import Poets from "@/components/pages/Poets";
import { getPropData } from "@/utils/client";
import { GET_POETS } from "@/gql/queries";
import { Suspense } from "react";

export default async function PoetsPage() {
  const { poets, poetsIndex } = await getPropData(GET_POETS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Poets poets={poets.items} poetsIndex={poetsIndex.items[0]} />
    </Suspense>
  );
}
