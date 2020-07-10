import React, { useState, useCallback } from 'react'
import { useQuery } from "urql";
import { FEED_SEARCH_QUERY } from "../utils/queries";
import { SEARCH } from '../utils/constants'
import { LinkType } from '../utils/types'
import Link from './Link'

const Search = () => {
  const [filter, setFilter] = useState('')

  const [result, executeQuery] = useQuery({
    query: FEED_SEARCH_QUERY,
    variables: { filter },
    pause: true,
  })

  const onClick = useCallback(() => {
    executeQuery();
  }, [executeQuery]);

  const { data } = result
  const links: Array<LinkType> = data ? data.feed.links : [];

  return (
    <div>
      <h4 className="mv3">{SEARCH}</h4>

      <div className="flex flex-column">
        <input
          type='text'
          onChange={({ target }) => setFilter(target.value)}
        />
      </div>
      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          onClick={onClick}
        >
          {SEARCH.toLowerCase()}
        </button>
      </div>
      <div className="mt3">
        {links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Search