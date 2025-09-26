import { GET_ABOUT } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import Markdown from "react-markdown";

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { aboutPageCollection } = await getPropData(GET_ABOUT);

  const aboutPage = aboutPageCollection.items[0];

  return (
    <main className="about-page page subgrid">
      <div className="sidebar">
        <div className="team sidebar__section">
          <h2 className="body-text" aria-label="Team">T</h2>
          <ul>
            {aboutPage.teamMembersCollection.items.map((member) => (
              <li key={member.name}>
                <h3 className="body-text">{member.name}</h3>
                <p>, {member.role}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__section mail">
          <h2 className="body-text" aria-label="Mail">M</h2>
          <a href={`mailto:${aboutPage.email}`} className="body-text">
            {aboutPage.email}
          </a>
        </div>
      </div>
      <div className="main-content">
        <Markdown>{aboutPage.pageContent}</Markdown>
      </div>
      <footer className="footer subgrid">
        <span className="body-text copyright">
          © {new Date().getFullYear()}
        </span>
        <div className="credits">
          <span className="body-text">Site by <a href="https://brunch.work" target="_blank" rel="noreferrer">Brunch</a></span>
        </div>
      </footer>
    </main>
  );
}
