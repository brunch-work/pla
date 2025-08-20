import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENTFUL_URL, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
  },
});

export const getPropData = async (query, variables) => {
  const data = await client.request(query, variables);
  return data;
};

export const SWRfetch = (query, variables) => {
  return client.request(query, variables);
};