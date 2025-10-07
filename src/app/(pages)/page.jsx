import HomeContainer from "@/components/pages/HomeContainer";
import { getPropData } from "@/utils/client";
import { GET_HOME } from "@/gql/queries";

export default async function HomePage() {
  const data = await getPropData(GET_HOME);
  return <HomeContainer homepage={data} />;
}
