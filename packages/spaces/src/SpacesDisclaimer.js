import React from 'react';
import PropTypes from 'prop-types';
import { Disclaimer } from '@availity/typography';
import ReactMarkdown from 'react-markdown';

import { useSpaces } from './Spaces';

const SpacesDisclaimer = ({ styled, spaceId, markdown, ...props }) => {
  const [space = {}] = useSpaces(spaceId);
  const { description: disclaimer, id } = space;

  if (disclaimer) {
    const children = markdown ? <ReactMarkdown>{disclaimer}</ReactMarkdown> : disclaimer;

    return (
      <Disclaimer styled={styled} {...props} id={props.id || `spaces-disclaimer-${spaceId || id}`}>
        {children}
      </Disclaimer>
    );
  }

  return null;
};

SpacesDisclaimer.defaultProps = {
  markdown: false,
};

SpacesDisclaimer.propTypes = {
  /** The id of the space to render the disclaimer for.
   * If no spaceId is provided, the first space in the spaces array is used.
   * Note: This is only to be used when the Spaces provider should only ever contain a single space. */
  spaceId: PropTypes.string,
  /** Render the disclaimer as markdown. */
  markdown: PropTypes.bool,
  /** When true, a vertical bar is displayed to the left of the disclaimer */
  styled: PropTypes.bool,
  id: PropTypes.string,
};

export default SpacesDisclaimer;
