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

export const GET_POETS_INDEX = gql`
  query getPoetsIndex {
    poetsIndex: poetsIndexCollection {
      items {
        pageContent
        pageTitle
      }
    }
  }
`;

export const GET_POETS = gql`
  query getPoets {
    poets: poetCollection(limit: 1000) {
      items {
        _id
        title: name
        slug
      }
    }
  }
`;

export const GET_POET_CONTENT = gql`
  query getPoetContent($slug: String!) {
    poet: poetCollection(where: { slug: $slug }) {
      items {
        _id
        title: name
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
    youtubeVideoCollection(where: { poets: { slug: $slug } }) {
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
        title: name
        slug
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

export const GET_INTERVIEW_CONTENT = gql`
  query getInterviewContent($slug: String!) {
    poet: interviewHostCollection(where: { slug: $slug }) {
      items {
        _id
        slug
        title: name
        bio
        photo {
          url
          width
          height
          title
        }
      }
    }
    youtubeVideoCollection(where: {interviewHost: {slug: $slug}}) {
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

export const GET_SERIES = gql`
  query getSeries {
    series: seriesCollection {
      items {
        _id
        title
        slug
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

export const GET_SERIES_CONTENT = gql`
  query getSeriesContent($slug: String!) {
    poet: seriesCollection(where: { slug: $slug }) {
      items {
        _id
        title
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
    youtubeVideoCollection(where: { series: { slug: $slug } }) {
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

export const GET_DOCUMENTARIES = gql`
  query getDocumentaries {
    documentaries: youtubeVideoCollection(
      where: { documentary: true }
      order: [publicationDate_DESC]
    ) {
      items {
        _id
        title
        slug
        description
        videoUrl
        publicationDate
        thumbnail {
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

export const GET_POETS_LIST = gql`
  query getPoetsList($activeItem: String) {
    list: poetCollection(limit: 1000, order: [name_ASC]) {
      items {
        _id
        title: name
        slug
      }
    }
    activeItem: poetCollection(where: { slug: $activeItem }) {
      items {
        _id
        title: name
        slug
      }
    }
  }
`;

export const GET_INTERVIEWS_LIST = gql`
  query getInterviewsList($activeItem: String) {
    list: interviewHostCollection(order: [name_ASC]) {
      items {
        _id
        title: name
        slug
      }
    }
    activeItem: interviewHostCollection(where: { slug: $activeItem }) {
      items {
        _id
        title: name
        slug
      }
    }
  }
`;

export const GET_SERIES_LIST = gql`
  query getSeriesList($activeItem: String) {
    list: seriesCollection(order: [title_ASC]) {
      items {
        _id
        title
        slug
      }
    }
    activeItem: seriesCollection(where: { slug: $activeItem }) {
      items {
        _id
        title
        slug
      }
    }
  }
`;

export const GET_DOCUMENTARIES_LIST = gql`
  query getDocumentariesList($activeItem: String) {
    list: youtubeVideoCollection(
      where: { documentary: true }
      order: [publicationDate_DESC]
    ) {
      items {
        _id
        title
        slug
      }
    }
    activeItem: youtubeVideoCollection(where: { slug: $activeItem }) {
      items {
        _id
        title
        slug
      }
    }
  }
`;
