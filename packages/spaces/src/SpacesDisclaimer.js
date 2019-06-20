import React from 'react';
import PropTypes from 'prop-types';
import { Disclaimer } from '@availity/typography';
import ReactMarkdown from 'react-markdown';

import { useSpace } from './Spaces';

const SpacesDisclaimer = ({ styled, spaceId, markdown, ...props }) => {
  const { space = {} } = useSpace(spaceId);
  const { description: disclaimer } = space;

  if (disclaimer) {
    const children = markdown ? (
      <ReactMarkdown source={disclaimer} />
    ) : (
      disclaimer
    );

    return (
      <Disclaimer
        data-testid={`spaces-disclaimer-${spaceId || space.id}`}
        styled={styled}
        {...props}
      >
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
  spaceId: PropTypes.string,
  markdown: PropTypes.bool,
  styled: PropTypes.bool,
};

export default SpacesDisclaimer;
