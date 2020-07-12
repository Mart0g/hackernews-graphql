import React, { useCallback, useMemo } from "react";
import { useQuery, useSubscription } from "urql";
import Link from "./Link";
import { FEED_QUERY } from "../graphql/queries";
import { NEW_VOTES_SUBSCRIPTION, NEW_LINKS_SUBSCRIPTION } from "../graphql/subscriptions";
import { FETCHING, ERROR, NEXT, PREVIOUS } from "../utils/constants";
import { LinkType, LinkListType } from "../utils/types";

const LinkList = ({ history, location, match }: LinkListType) => {
  const isNewPage = location.pathname.includes('new')
  const page = parseInt(match.params.page, 5)

  const variables = useMemo(() => ({
    skip: isNewPage ? (page - 1) * 5 : 0,
    first: isNewPage ? 5 : 10,
    orderBy: isNewPage ? 'createdAt_DESC' : null
  }), [isNewPage, page])

  const [result] = useQuery({ query: FEED_QUERY, variables })
  const { data, fetching, error } = result;

  useSubscription({ query: NEW_VOTES_SUBSCRIPTION })
  useSubscription({ query: NEW_LINKS_SUBSCRIPTION })

  const linksToRender: Array<LinkType> = useMemo(() => {
    if (!data || !data.feed) {
      return [];
    } else if (isNewPage) {
      return data.feed.links;
    } else {
      const rankedLinks = data.feed.links
        .slice()
        .sort((l1: LinkType, l2: LinkType) => l2.votes.length - l1.votes.length);
      return rankedLinks;
    }
  }, [data, isNewPage]);

  const nextPage = useCallback(() => {
    if (page <= data.feed.count / 5) {
      history.push(`/new/${page + 1}`);
    }
  }, [history, data, page]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      history.push(`/new/${page - 1}`);
    }
  }, [history, page]);

  if (fetching) return <div>{FETCHING}</div>;
  if (error) return <div>{ERROR}</div>;

  const pageIndex = isNewPage ? (page - 1) * 5 : 0

  return (
    <>
      <div>
        {linksToRender.map((link: LinkType, index: number) => (
          <Link key={link.id} link={link} index={pageIndex + index} />
        ))}
      </div>
      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div className="pointer mr2" onClick={previousPage}>
            {PREVIOUS}
          </div>
          <div className="pointer" onClick={nextPage}>
            {NEXT}
          </div>
        </div>
      )}
    </>
  );
};

export default LinkList;
