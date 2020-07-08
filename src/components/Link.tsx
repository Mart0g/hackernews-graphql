import React from 'react'
import { LinkType } from '../utils/types'

type LinkProps = {
  link: LinkType
}

const Link = ({ link }: LinkProps) => {
  const { description, url } = link;

  return (
    <div>
      <div>
        {description} ({url})
      </div>
    </div>
  );
};

export default Link;
