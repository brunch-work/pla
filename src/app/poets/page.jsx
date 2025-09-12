import { getPropData } from "@/utils/client";
import { GET_POETS } from "@/gql/queries";
import { Suspense } from "react";

export default async function PoetsPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    </Suspense>
  );
}
