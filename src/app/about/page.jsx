import { GET_ABOUT } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import Markdown from "react-markdown";

export default async function AboutPage() {
  const { aboutPageCollection } = await getPropData(GET_ABOUT);

  const aboutPage = aboutPageCollection.items[0];

  console.log(aboutPage);

  return (
    <main className="about-page page subgrid">
      <div className="sidebar">
        <div className="team sidebar__section">
          <h1 className="body-text">T</h1>
          <ul>
            {aboutPage.teamMembersCollection.items.map((member) => (
              <li key={member.name}>
                <h2 className="body-text">{member.name}</h2>
                <p>, {member.role}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__section mail">
          <h1 className="body-text">M</h1>
          <a href={`mailto:${aboutPage.email}`} className="body-text">
            {aboutPage.email}
          </a>
        </div>
      </div>
      <div className="main-content">
        <Markdown>{aboutPage.pageContent}</Markdown>
      </div>
    </main>
  );
}
