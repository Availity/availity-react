import React from 'react';

type CellProps = {
  value: string | number;
};

export interface CurrencyCellConfig {
  currency?: string;
  style?: string;
  numberFormat?: string;
  defaultValue?: string;
  locales?: string;
}

const CurrencyCell = ({ currency = 'USD', defaultValue = '', locales = 'en-us' }: CurrencyCellConfig) => {
  const CurrencyCellDef = ({ value } : CellProps) => {
    let formattedValue;
    if (!value) {
      formattedValue = defaultValue;
    }

    value = typeof value === 'string' ? Number.parseFloat(value) : value;
    const formatNum = new Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
    }).format;

    formattedValue = formatNum(value);
    return <span title={formattedValue}>{formattedValue}</span>;
  };

  return CurrencyCellDef;
};

export default CurrencyCell;
