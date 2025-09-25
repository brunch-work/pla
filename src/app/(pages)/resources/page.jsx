import { GET_RESOURCES } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import Markdown from "react-markdown";

export const metadata = {
  title: "Resources",
}

export default async function ResourcesPage() {
  const { resourcesPageCollection } = await getPropData(GET_RESOURCES);
  const resourcePage = resourcesPageCollection.items[0];

  return (
    <main className="about-page page subgrid">
      <div className="sidebar">
        <div className="list">
          <h1 className="body-text">Los Angeles Literature: Resources</h1>
          <ul>
            {resourcePage.resourcesCollection.items.map((resource) => (
              <li key={resource.name} className="resource-item">
                <a href={resource.url} className="body-text" target="_blank" rel="noreferrer">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  <title>opens in a new tab</title>
                    <path
                      d="M2.18507 12.4541L0.963135 11.2338L10.0493 2.1438H3.03102L3.04669 0.454102H12.9631V10.3733H11.2556L11.2712 3.36414L2.18507 12.4541Z"
                      fill="#2E2E2E"
                    />
                  </svg>
                  <h2 className="body-text">
                    {resource.name}
                  </h2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main-content">
        <Markdown>{resourcePage.pageContent}</Markdown>
      </div>
    </main>
  );
}
