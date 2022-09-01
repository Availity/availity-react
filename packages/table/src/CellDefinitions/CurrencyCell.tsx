import React from 'react';

type CellProps = {
  value: string | number;
};

export interface CurrencyCellConfig {
  currency?: string;
  style?: string;
  defaultValue?: string | React.ReactChild | React.ElementType;
  locales?: string;
}

const CurrencyCell = ({
  currency = 'USD',
  defaultValue = '',
  style = 'currency',
  locales = 'en-us',
}: CurrencyCellConfig): JSX.Element | ((cell: CellProps) => JSX.Element) => {
  const CurrencyCellDef = ({ value }: CellProps): JSX.Element => {
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
    return <span title={typeof formattedValue === 'string' ? formattedValue : undefined}>{formattedValue}</span>;
  };

  return CurrencyCellDef;
};

export default CurrencyCell;
