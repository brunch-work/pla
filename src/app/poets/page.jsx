import Poets from "@/components/pages/Poets";
import { getPropData } from "@/utils/client";
import { GET_POETS } from "@/gql/queries";

export default async function PoetsPage() {
  const { poets, poetsIndex } = await getPropData(GET_POETS);

  return <Poets poets={poets.items} poetsIndex={poetsIndex.items[0]} />;
}
