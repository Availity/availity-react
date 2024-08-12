import React from 'react';
import { Badge } from 'reactstrap';

type CellProps = {
  value: string;
};

const BadgeCell = (
  color: string,
  displayText = '',
  defaultValue?: string | null | React.ReactChild | React.ElementType
): JSX.Element | ((cell: CellProps) => JSX.Element | null) | null => {
  const BadgeCellDef = ({ value }: CellProps): JSX.Element | null => {
    const defaultVal = defaultValue || null;
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return value ? <Badge color={color}>{value}</Badge> : defaultValue ? <>{defaultVal}</> : null;
  };

  if (displayText !== '') {
    return BadgeCellDef({ value: displayText });
  }

  return BadgeCellDef;
};

export default BadgeCell;
