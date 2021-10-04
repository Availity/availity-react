import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const BadgeCell = (color, displayText = '') => {
  const BadgeCellDef = ({ value }) => (
    <Badge color={color} title={value}>
      {value}
    </Badge>
  );

  if (displayText !== '') {
    return BadgeCellDef({ value: displayText });
  }

  BadgeCellDef.propTypes = {
    value: PropTypes.string,
  };

  return BadgeCellDef;
};

export default BadgeCell;
