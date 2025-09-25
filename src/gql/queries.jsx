export const GET_HOME = `
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

export const GET_POETS_INDEX = `
  query getPoetsIndex {
    poetsIndex: poetsIndexCollection {
      items {
        pageContent
        pageTitle
      }
    }
  }
`;

export const GET_POETS = `
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

export const GET_POET_CONTENT = `
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

export const GET_INTERVIEW_HOSTS = `
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

export const GET_INTERVIEW_CONTENT = `
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

export const GET_SERIES = `
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

export const GET_SERIES_CONTENT = `
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

export const GET_DOCUMENTARIES = `
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

export const GET_POETS_LIST = `
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

export const GET_INTERVIEWS_LIST = `
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

export const GET_SERIES_LIST = `
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

export const GET_DOCUMENTARIES_LIST = `
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

export const GET_ABOUT = `
query getAbout {
  aboutPageCollection {
    items {
      pageTitle
      pageContent
      email
      teamMembersCollection {
        items {
          name
          role
        }
      }
    }
  }
}
`;

export const GET_RESOURCES = `
query getResources {
  resourcesPageCollection {
    items {
      pageTitle
      pageContent
      resourcesCollection {
        items {
          name
          url
        }
      }
    }
  }
}
`;
