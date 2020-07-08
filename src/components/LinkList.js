import React from "react";
import Link from "./Link";
import { useQuery } from "urql";
import { FEED_QUERY } from "../utils/queries";
import { FETCHING, ERROR } from "../utils/constants";

const LinkList = () => {
  const [result] = useQuery({ query: FEED_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <div>{FETCHING}</div>;
  if (error) return <div>{ERROR}</div>;

  const linksToRender = data.feed.links;

  return (
    <div>
      {linksToRender.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;
