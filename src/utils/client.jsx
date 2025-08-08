import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_DATO_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_API_KEY}`,
  },
});

export const getPropData = async (query, variables) => {
  const data = await client.request(query, variables);
  return data;
};

export const SWRfetch = (query, variables) => {
  return client.request(query, variables);
};