import { GET_RESOURCES } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import Markdown from "react-markdown";

export default async function ResourcesPage() {
  const { resourcesPageCollection } = await getPropData(GET_RESOURCES);
  const resourcePage = resourcesPageCollection.items[0];
  console.log(resourcePage);

  return (
    <main className="about-page page subgrid">
      <div className="sidebar">

      </div>
      <div className="main-content">
        <Markdown>{resourcePage.pageContent}</Markdown>
      </div>
    </main>
  );
}
