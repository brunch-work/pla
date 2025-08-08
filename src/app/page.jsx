import Homepage from "@/components/pages/Homepage";
import { getPropData } from "@/utils/client";
import { GET_HOME } from "@/gql/queries";

export default async function Home() {
  // const { homepage } = await getPropData(GET_HOME);

  const placeholderHomepage = {
    videos: [
      {
        id: "bdkREWOuQVqZGpjt-MCQSA",
        publicationDate: "2025-08-01",
        description:
          "Anim elit incididunt reprehenderit quis Lorem minim culpa proident aliquip consequat. Est duis sit in exercitation tempor eiusmod esse eiusmod. Consectetur fugiat exercitation dolor nostrud cillum non. Qui pariatur ex aliqua exercitation. Minim ut adipisicing fugiat esse ex Lorem adipisicing reprehenderit.",
        thumbnail: {
          url: "https://www.datocms-assets.com/166070/1754078573-didhesls07i.jpg",
          width: 2500,
          height: 1667,
        },
        title: "The First Video",
        video: {
          providerUid: "3kJTl6PnB-g",
          url: "https://www.youtube.com/watch?v=3kJTl6PnB-g",
        },
      },
      {
        id: "eODCHpOhS7eOFEnYsLiu9w",
        publicationDate: "2025-07-17",
        description:
          "Excepteur excepteur do elit officia non nisi proident. Laboris duis adipisicing dolore occaecat id ea ut exercitation in consectetur enim exercitation eiusmod consequat. Consectetur do deserunt ut sint. Reprehenderit duis sit dolore sint dolore eiusmod do occaecat ea.",
        thumbnail: {
          url: "https://www.datocms-assets.com/166070/1754078730-a-woman-standing-in-front-of-a.jpg",
          width: 2500,
          height: 1667,
        },
        title: "The Second Video",
        video: {
          providerUid: "7KTIrfiRfyM",
          url: "https://www.youtube.com/watch?v=7KTIrfiRfyM",
        },
      },
    ],
    homepageText: {
      value: {
        schema: "dast",
        document: {
          type: "root",
          children: [
            {
              type: "heading",
              level: 1,
              children: [
                {
                  type: "span",
                  value: "A Video Gallery of Poets in Southern California.",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  url: "/about",
                  type: "link",
                  children: [
                    {
                      type: "span",
                      value: "About us",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  };

  return <Homepage homepage={placeholderHomepage} />;
}
