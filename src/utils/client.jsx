const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_CONTENTFUL_URL;
const environment = process.env.NODE_ENV;
const cache = environment === "development" ? "force-cache" : "default";
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
};

/**
 * Helper function to make a GraphQL request using fetch with Next.js cache control.
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @param {object} options - Optional fetch cache options (e.g. revalidate time)
 */

export const fetchGraphQL = async (query, variables) => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
    cache: cache,
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
};

export const getPropData = async (query, variables) => {
  return fetchGraphQL(query, variables);
};

export const SWRfetch = (query, variables) => {
  return fetchGraphQL(query, variables);
};