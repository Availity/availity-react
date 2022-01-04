import React from 'react';
import type { CSSProperties } from 'react';

const shouldProbablyBeInUIKit: CSSProperties = { paddingTop: '12px' };
const linkStyles: CSSProperties = { fontWeight: 'bold' };

export type Props = {
  name: string;
  link: string;
};

const TrainingLink = ({ name, link }: Props): JSX.Element => (
  <span style={shouldProbablyBeInUIKit} className="ml-auto">
    Need Help?{' '}
    <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
      Watch a demo
    </a>{' '}
    for {name}
  </span>
);

export default TrainingLink;
