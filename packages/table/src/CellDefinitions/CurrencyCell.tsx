import React from 'react';
import { UncontrolledTooltip, UncontrolledTooltipProps } from 'reactstrap';
import { Column, IdType, Row } from '../types/ReactTable';

type CellProps<T extends IdType> = {
  value: string | number;
  row: Row<T>;
  column: Column<T>;
};

export interface CurrencyCellConfig<T> {
  currency?: string;
  style?: string;
  defaultValue?: string | React.ReactChild | React.ElementType;
  locales?: string;
  displayTooltip?: boolean;
  tooltipProps?: UncontrolledTooltipProps;
}

const CurrencyCell = <T extends IdType>({
  currency = 'USD',
  defaultValue = '',
  style = 'currency',
  locales = 'en-us',
  displayTooltip = true,
  tooltipProps,
}: CurrencyCellConfig<T>): JSX.Element | ((cell: CellProps<T>) => JSX.Element) => {
  const CurrencyCellDef = ({ value, row, column }: CellProps<T>): JSX.Element => {
    let formattedValue;

    if (!value) {
      formattedValue = defaultValue;
    } else {
      value = typeof value === 'string' ? Number.parseFloat(value) : value;
      const formatNum = new Intl.NumberFormat(locales, {
        style,
        currency,
      }).format;

      formattedValue = formatNum(value);
    }

    return formattedValue !== defaultValue ? (
      <>
        <span id={`currency-cell-${row.id}-${column.id}`}>{formattedValue}</span>
        {displayTooltip && typeof formattedValue === 'string' && (
          <UncontrolledTooltip
            role="tooltip"
            placement="top"
            target={`currency-cell-${row.id}-${column.id}`}
            boundary="window"
            {...tooltipProps}
          >
            {typeof formattedValue === 'string' ? formattedValue : undefined}
          </UncontrolledTooltip>
        )}
      </>
    ) : (
      <>{defaultValue}</>
    );
  };

  return CurrencyCellDef;
};

export default CurrencyCell;
