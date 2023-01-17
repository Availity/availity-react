import React from 'react';
import PropTypes from 'prop-types';

import { useSpaces } from './Spaces';

const SpacesGhostText = ({ spaceId, id, ...props }) => {
  const [space = {}] = useSpaces(spaceId);

  if (space.isGhost) {
    return (
      <small className="ghost-text" id={id || `app-ghost-text-${spaceId}`} {...props}>
        <em>{space.metadata.ghostText}</em>
      </small>
    );
  }

  return null;
};

SpacesGhostText.propTypes = {
  /** The id of the space to render the ghost text for.
   * If no spaceId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space. */
  spaceId: PropTypes.string,
  id: PropTypes.string,
};

export default SpacesGhostText;
