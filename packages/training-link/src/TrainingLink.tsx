import React from 'react';
import type { CSSProperties } from 'react';

const shouldProbablyBeInUIKit: CSSProperties = { paddingTop: '12px' };
const linkStyles: CSSProperties = { fontWeight: 'bold' };

export type TrainingLinkProps = {
  /**Link to training video.*/
  link?: string;
  /**Name of your app to make the sentence complete.*/
  name?: string;
};

const TrainingLink = ({ name, link }: TrainingLinkProps): JSX.Element => (
  <>
    {name ? (
      <span style={shouldProbablyBeInUIKit} className="ml-auto">
        Need Help?{' '}
        <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
          Watch a demo <span className="sr-only">(opens in a new tab)</span>
        </a>{' '}
        for {name}
      </span>
    ) : (
      <span style={shouldProbablyBeInUIKit} className="ml-auto">
        Need Help?{' '}
        <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      </span>
    )}
  </>
);

export default TrainingLink;
