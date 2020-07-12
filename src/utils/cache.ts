import { FEED_QUERY } from "../graphql/queries";

export const updateCache = (cache: any, resultProp: any) => {
  const variables = { first: 5, skip: 0, orderBy: "createdAt_DESC" };
  cache.updateQuery({ query: FEED_QUERY, variables }, (data: any) => {
    if (data !== null) {
      data.feed.links.unshift(resultProp);
      data.feed.count++;
      return data;
    } else {
      return null;
    }
  });
};
