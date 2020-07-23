import React from 'react';
import { Link } from '@material-ui/core';

const PostMedia = (props) => {
  const { type, source, domain } = props;

  let media;

  switch (type) {
    case 'image':
      media = <img width="350" src={source} alt={domain} />
      break;

    case 'link':
      media = <Link href={source}>{source}</Link>
      break;

    default:
      media = null
      break;
  }

  return <> {media} </>
}

export default PostMedia;