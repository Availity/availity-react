import React from 'react';
import moment from 'moment';

export type CellProps = {
  value: string;
};

export interface DateTimeCellConfig {
  dateFormat: string;
  defaultValue?: string | React.ReactChild | React.ElementType;
}

const DateCell = ({
  dateFormat,
  defaultValue,
}: DateTimeCellConfig): JSX.Element | ((cell: CellProps) => JSX.Element) => {
  const DateCellDef = ({ value }: CellProps): JSX.Element => {
    let formattedValue;
    if (!value) {
      formattedValue = defaultValue;
    } else {
      formattedValue = moment(value).format(dateFormat);
    }

    return formattedValue !== defaultValue ? (
      <span title={typeof formattedValue === 'string' ? formattedValue : undefined}>{formattedValue}</span>
    ) : (
      <>{defaultValue}</>
    );
  };

  return DateCellDef;
};

export default DateCell;
