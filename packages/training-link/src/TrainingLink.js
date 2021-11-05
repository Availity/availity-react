import React from 'react';
import PropTypes from 'prop-types';

const shouldProbablyBeInUIKit = {
  paddingTop: '12px',
};

const linkStyles = { fontWeight: 'bold' };

const TrainingLink = ({ name, link }) => (
  <span style={shouldProbablyBeInUIKit} className="ml-auto">
    Need Help?{' '}
    <a href={link} style={linkStyles} className="link" target="_blank" rel="noopener noreferrer">
      Watch a demo
    </a>{' '}
    for {name}
  </span>
);

TrainingLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TrainingLink;
