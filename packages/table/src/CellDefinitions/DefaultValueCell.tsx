import React from 'react';

type CellValue<T> = T;
type CellProps<T> = {
  value: CellValue<T>;
};

export type DefaultValueCellProps<T> = {
  defaultValue?: string | React.ReactChild | React.ElementType;
};

const DefaultValueCell = <T extends unknown>({
  defaultValue = '',
}: DefaultValueCellProps<T>): JSX.Element | ((cell: CellProps<T>) => JSX.Element | null) => {
  const DefaultValueCellDef = ({ value }: CellProps<T>): JSX.Element | null => <>{value ? value : defaultValue}</>;

  return DefaultValueCellDef;
};

export default DefaultValueCell;
