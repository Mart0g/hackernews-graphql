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
      <div>
        <input
          type='text'
          onChange={({ target }) => setFilter(target.value)}
        />
        {' '}
        <button onClick={onClick}>{SEARCH}</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  )
}

export default Search