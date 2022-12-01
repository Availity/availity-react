import React from 'react';
import PropTypes from 'prop-types';
import { Agreement } from '@availity/typography';
import ReactMarkdown from 'react-markdown';

import { useSpaces } from './Spaces';

const SpacesAgreement = ({ spaceId, markdown, ...props }) => {
  const [space = {}] = useSpaces(spaceId);
  const { description: agreement, id } = space;

  if (agreement) {
    const children = markdown ? <ReactMarkdown source={agreement} /> : agreement;

    return (
      <Agreement {...props} id={props.id || `spaces-agreement-${spaceId || id}`}>
        {children}
      </Agreement>
    );
  }

  return null;
};

SpacesAgreement.defaultProps = {
  markdown: false,
};

SpacesAgreement.propTypes = {
  /** The id of the space to render the agreement for.
   * If no spaceId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space. */
  spaceId: PropTypes.string,
  /** Render the agreement as markdown. */
  markdown: PropTypes.bool,
  id: PropTypes.string,
};

export default SpacesAgreement;
