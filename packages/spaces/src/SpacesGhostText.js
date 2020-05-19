import React from 'react';
import PropTypes from 'prop-types';

import { useSpaces } from './Spaces';

const SpacesGhostText = ({ spaceId, ...props }) => {
  const [space = {}] = useSpaces(spaceId);

  if (space.isGhost) {
    return (
      <small className="ghost-text" data-testid="spaces-ghost-text" {...props}>
        <em>{space.metadata.ghostText}</em>
      </small>
    );
  }
  return null;
};

SpacesGhostText.propTypes = {
  spaceId: PropTypes.string,
};

export default SpacesGhostText;
