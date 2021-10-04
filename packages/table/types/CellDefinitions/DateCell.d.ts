import { CellProps } from 'react-table';

export interface DateTimeCellConfig {
    dateFormat: string;
    timeFormat?: string;
    convertTimeZone?: boolean;
}

declare function DateCell({ value }: CellProps<any, string>): string;

export { DateCell };