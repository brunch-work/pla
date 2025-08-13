import { gql } from "graphql-request";

export const GET_HOME = gql`
  query Home {
    homepage {
      tagline
      seo {
        description
        title
        twitterCard
        noIndex
        image {
          url
          alt
        }
      }
    }
    allYoutubeVideos(first: "12", orderBy: publicationDate_DESC) {
      id
      publicationDate
      description
      thumbnail {
        url
        width
        height
      }
      title
      youtubeVideo {
        url
        providerUid
      }
    }
  }
`;
