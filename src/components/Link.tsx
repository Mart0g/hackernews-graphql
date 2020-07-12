import React, { useCallback } from "react";
import { useMutation } from "urql";
import { VOTE_MUTATION } from "../graphql/mutations";
import { getToken } from "../utils/token";
import { timeDifferenceForDate } from "../utils/dates";
import { LinkType } from "../utils/types";
import { VOTES_BY, UNKNOWN } from "../utils/constants";

type LinkProps = {
  index: number
  link: LinkType
}

const Link = ({ index, link }: LinkProps) => {
  const isLoggedIn = !!getToken()
  const { id, description, url, votes, postedBy, createdAt } = link

  const [{ fetching }, executeMutation] = useMutation(VOTE_MUTATION);

  const onClick = useCallback(() => {
    if (!fetching) {
      executeMutation({ linkId: id });
    }
  }, [fetching, executeMutation, id]);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {isLoggedIn && (
          <div className="ml1 gray f11" onClick={onClick}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {`${votes.length} ${VOTES_BY} ${postedBy? postedBy.name : UNKNOWN} `}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  )
};

export default Link;
