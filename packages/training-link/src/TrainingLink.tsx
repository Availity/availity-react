import React from 'react';
import PropTypes from 'prop-types';

const shouldProbablyBeInUIKit = { paddingTop: '12px' };
const linkStyles = { fontWeight: 'bold' } as const;

export type TrainingLinkProps = {
  /**Link to training video.*/
  link?: string;
  /**Name of your app to make the sentence complete.*/
  name?: string;
};

const TrainingLink = ({ name, link }: TrainingLinkProps): JSX.Element => (
  <span style={shouldProbablyBeInUIKit} className="ml-auto">
    Need Help?{' '}
    <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
      Watch a demo <span className="sr-only">(opens in a new tab)</span>
    </a>{' '}
    for {name}
  </span>
);

export default TrainingLink;
