import Homepage from "@/components/pages/Homepage";
import { getPropData } from "@/utils/client";
import { GET_HOME } from "@/gql/queries";

export default async function Home() {
  const data = await getPropData(GET_HOME);

  console.log(data)

  return <Homepage homepage={data} />;
}
