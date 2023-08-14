import React from 'react';
import moment from 'moment';
import { UncontrolledTooltip, UncontrolledTooltipProps } from 'reactstrap';
import { Column, IdType, Row } from '../types/ReactTable';

type CellProps<T extends IdType> = {
  value: string;
  row: Row<T>;
  column: Column<T>;
};

export interface DateTimeCellConfig {
  dateFormat: string;
  defaultValue?: string | React.ReactChild | React.ElementType;
  displayTooltip?: boolean;
  tooltipProps?: UncontrolledTooltipProps;
}

const DateCell = <T extends IdType>({
  dateFormat,
  defaultValue,
  displayTooltip = true,
  tooltipProps,
}: DateTimeCellConfig): JSX.Element | ((cell: CellProps<T>) => JSX.Element) => {
  const DateCellDef = ({ value, row, column }: CellProps<T>): JSX.Element => {
    const formattedValue = !value ? defaultValue : moment(value).format(dateFormat);

    return formattedValue !== defaultValue ? (
      <>
        <span id={`date-cell-${row.id}-${column.id}`}>{formattedValue}</span>
        {displayTooltip && typeof formattedValue === 'string' && (
          <UncontrolledTooltip
            role="tooltip"
            placement="top"
            target={`date-cell-${row.id}-${column.id}`}
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

  return DateCellDef;
};

export default DateCell;
