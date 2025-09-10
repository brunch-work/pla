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
    poets: poetCollection  {
      items {
        _id
        name
        slug
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
        pageContent
        pageTitle
      }
    }
  }
`;

export const GET_POET_VIDEOS = gql`
  query getPoetVideos($poetSlug: String!) {
    youtubeVideoCollection(where: { poets: { slug: $poetSlug } }) {
      items {
        _id
        title
        videoUrl
        description
        publicationDate
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


export const GET_INTERVIEW_HOSTS = gql`
  query getInterviewHosts {
    interviewHosts: interviewHostCollection {
      items {
        _id
        name
        slug
        bio
        photo {
          url
          width
          height
          title
        }
      }
    }
    interviewsIndex: interviewsIndexCollection {
      items {
        pageContent
        pageTitle
      }
    }
  }
`;

export const GET_SERIES = gql`
  query getSeries {
    series: seriesCollection {
      items {
        _id
        name: title
        slug
        description
        photo: image {
          url
          width
          height
          title
        }
      }
    }
    seriesIndex: seriesIndexCollection {
      items {
        pageContent
        pageTitle
      }
    }
  }
`;

export const GET_DOCUMENTARIES = gql`
  query getDocumentaries {
    documentaries: youtubeVideoCollection (where: {documentary_exists: true}, order: [publicationDate_DESC]) {
      items {
        _id
        name: title
        slug
        description
        photo: thumbnail {
          url
          width
          height
          title
        }
      }
    }
    documentariesIndex: documentariesIndexCollection {
      items {
        pageContent
        pageTitle
      }
    }
  }
`;
