import React from 'react';
import { Badge } from 'reactstrap';

type CellProps = {
  value: string;
};

const BadgeCell = (color:string, displayText = '') => {
  const BadgeCellDef = ({ value }: CellProps) : JSX.Element => (
    <Badge color={color} title={value}>
      {value}
    </Badge>
  );

  if (displayText !== '') {
    return BadgeCellDef({ value: displayText });
  }


  return BadgeCellDef;
};

export default BadgeCell;
