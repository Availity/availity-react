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
  spaceId: PropTypes.string,
  id: PropTypes.string,
};

export default SpacesGhostText;
