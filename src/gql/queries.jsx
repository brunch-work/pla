import { gql } from "graphql-request";

export const GET_HOME = gql`
  query getHome {
    youtubeVideoCollection(limit: 12, order: [publicationDate_DESC]) {
      items {
        _id
        title
        videoUrl
        description
        publicationDate
        documentary
        thumbnail {
          url
          width
          height
          description
          contentType
        }
      }
    }
  }
`;

export const GET_POETS = gql`
  query getPoets {
    poets: poetCollection {
      items {
        _id
        name
        bio
        photo {
          url
          width
          height
          title
        }
      }
    }
    poetsIndex: poetsIndexCollection {
      items {
        pageDescription
        pageTitle
      }
    }
  }
`;
