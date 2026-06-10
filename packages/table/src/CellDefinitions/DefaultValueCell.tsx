import React from 'react';

type CellValue<T> = T;
type CellProps<T> = {
  value: CellValue<T>;
};

export type DefaultValueCellProps = {
  defaultValue?: string | React.ReactNode | React.ElementType;
};

const DefaultValueCell = <T,>({
  defaultValue = '',
}: DefaultValueCellProps): React.JSX.Element | ((cell: CellProps<T>) => React.JSX.Element | null) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const DefaultValueCellDef = ({ value }: CellProps<T>): React.JSX.Element | null => <>{value || defaultValue}</>;

  return DefaultValueCellDef;
};

export default DefaultValueCell;
