export interface DateTimeCellConfig {
    dateFormat: string;
    timeFormat?: string;
    convertTimeZone?: boolean;
}

declare function DateCell(config: DateTimeCellConfig): JSX.Element;

export default DateCell;