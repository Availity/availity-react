import React from 'react';
import moment from 'moment';

export type CellProps = {
  value: string;
};

export interface DateTimeCellConfig {
  dateFormat: string;
  timeFormat?: string;
  convertTimeZone?: boolean;
}

const DateCell = ({ dateFormat }: DateTimeCellConfig): JSX.Element | ((cell: CellProps) => JSX.Element) => {
  const DateCellDef = ({ value }: CellProps): JSX.Element => {
    let formattedValue;
    if (value) {
      formattedValue = moment(value).format(dateFormat);
    }
    return <span title={formattedValue}>{formattedValue}</span>;
  };

  return DateCellDef;
};

export default DateCell;
