import React from 'react';

const shouldProbablyBeInUIKit = { paddingTop: '12px' };
const linkStyles = { fontWeight: 'bold' } as const;

export type TrainingLinkProps = {
  name: string;
  link: string;
};

const TrainingLink = ({ name, link }: TrainingLinkProps): JSX.Element => (
  <span style={shouldProbablyBeInUIKit} className="ml-auto">
    Need Help?{' '}
    <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
      Watch a demo
    </a>{' '}
    <span className="sr-only">(opens in a new tab) </span>
    for {name}
  </span>
);

export default TrainingLink;
