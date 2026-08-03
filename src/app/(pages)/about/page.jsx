import { GET_ABOUT } from "@/gql/queries";
import { getPropData } from "@/utils/client";
import Markdown from "react-markdown";

import { VideoPlayer } from "@/components/VideoPlayer";

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { aboutPageCollection } = await getPropData(GET_ABOUT);

  const aboutPage = aboutPageCollection.items[0];

  const video = {
    id: "UC9xv9pj2wrbNa7CsQXyj-wA",
    title: "Poets in Southern California",
    description: "",
    thumbnail: {
      url: "https://images.ctfassets.net/1gqe9kiz0yup/loQrNbTAs1jubArLKzCrE/c05dc00807ebbdbe5eb1b2ccea12a85c/SoCal_Poets_in_Conversation.png",
      alt: "Poets in Southern California",
    },
    videoUrl: aboutPage.videoUrl,
  };

  return (
    <main className="about-page page subgrid">
      <div className="sidebar">
        <div className="team sidebar__section">
          <h2 className="body-text" aria-label="Team">
            T
          </h2>
          <ul>
            {aboutPage.teamMembersCollection.items.map((member) => (
              <li key={member.name}>
                <h3 className="body-text">{member.name}</h3>
                <p>, {member.role}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__section social">
          <h2 className="body-text" aria-label="Social">
            S
          </h2>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/channel/UC9xv9pj2wrbNa7CsQXyj-wA"
                className="body-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/poetry.la"
                className="body-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100027318083434"
                className="body-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/PoetryLA"
                className="body-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="sidebar__section mail">
          <h2 className="body-text" aria-label="Mail">
            M
          </h2>
          <a href={`mailto:${aboutPage.email}`} className="body-text">
            {aboutPage.email}
          </a>
        </div>
      </div>
      <div className="main-content">
        <Markdown>{aboutPage.pageContent}</Markdown>
        <a
          href="https://lp.constantcontactpages.com/sl/zBh1LrQ"
          className="body-text no-decoration"
          target="_blank"
          rel="noopener noreferrer"
        >
          <u>Sign up for our video releases</u>
          <br />
          Receive each new video directly to your inbox.
        </a>
        <VideoPlayer video={video} />
      </div>
      <footer className="footer subgrid">
        <span className="body-text copyright">
          © {new Date().getFullYear()}
        </span>
        <div className="credits">
          <span className="body-text">
            Site by{" "}
            <a href="https://brunch.work" target="_blank" rel="noreferrer">
              Brunch
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
