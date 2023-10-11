import React from 'react';
import type { CSSProperties } from 'react';

const shouldProbablyBeInUIKit: CSSProperties = { paddingTop: '12px' };
const linkStyles: CSSProperties = { fontWeight: 'bold' };

export type TrainingLinkProps = {
  /** Link to training video. */
  link?: string;
};

const TrainingLink = ({ link }: TrainingLinkProps): JSX.Element => (
  <span style={shouldProbablyBeInUIKit} className="ml-auto">
    Need Help?{' '}
    <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
      Learn More
    </a>
  </span>
);

export default TrainingLink;
