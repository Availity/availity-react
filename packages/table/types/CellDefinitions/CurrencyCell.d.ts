export interface CurrencyCellConfig {
  currency?: string;
  style?: string;
  numberFormat?: string;
  defaultValue?: string;
}

declare function CurrencyCell(config?: CurrencyCellConfig): string;

export default CurrencyCell;
