import { CellProps } from 'react-table';

export interface CurrencyCellConfig {
    currency: string;
    style?: string;
    numberFormat?: string;
    defaultValue?: string;
}
declare function CurrencyCell({ value }: CellProps<any, string>): string;

export { CurrencyCell };