import { gql } from "graphql-request";

export const GET_HOME = gql`
  query Home {
    homepage {
      videos {
        id
        publicationDate
        thumbnail {
          url
          width
          height
        }
        title
        video {
          url
          providerUid
        }
      }
      homepageText {
        value
      }
    }
  }
`;
