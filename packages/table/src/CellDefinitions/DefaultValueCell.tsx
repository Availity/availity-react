import React from 'react';

type CellValue<T> = T;
type CellProps<T> = {
  value: CellValue<T>;
};

export type DefaultValueCellProps = {
  defaultValue?: string | React.ReactChild | React.ElementType;
};

const DefaultValueCell = <T,>({
  defaultValue = '',
}: DefaultValueCellProps): JSX.Element | ((cell: CellProps<T>) => JSX.Element | null) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const DefaultValueCellDef = ({ value }: CellProps<T>): JSX.Element | null => <>{value || defaultValue}</>;

  return DefaultValueCellDef;
};

export default DefaultValueCell;
