import React, { ReactElement } from 'react';
import Icon, { IconProps } from '@availity/icon';
import { UncontrolledTooltip, UncontrolledTooltipProps } from 'reactstrap';
import { IdType, Row } from '../types/ReactTable';

type CellValue<T> = T;
type CellProps<T extends IdType> = {
  value: CellValue<T>;
  row: Row<T>;
};

export type IconWithTooltipConfig<T extends IdType> = {
  name: string;
  tooltipText: string | ((value: T) => string);
  getId?: (row: Row<T>) => string;
  tooltipProps?: UncontrolledTooltipProps;
  defaultValue?: string | React.ReactChild | React.ElementType;
} & IconProps;

const IconWithTooltipCell = <T extends IdType>({
  id,
  name,
  tooltipText,
  getId,
  tooltipProps,
  defaultValue,
  ...attributes
}: IconWithTooltipConfig<T>): JSX.Element | ((cell: CellProps<T>) => JSX.Element | null) => {
  const IconCellDef = ({ value, row }: CellProps<T>): JSX.Element | null => {
    const tooltip = typeof tooltipText === 'string' ? tooltipText : tooltipText(value);
    const idVal = id ? id : getId ? getId(row) : undefined;

    return value ? (
      <>
        <Icon id={idVal} name={name} {...attributes} />
        {idVal && (
          <UncontrolledTooltip target={idVal} {...tooltipProps}>
            {tooltip}
          </UncontrolledTooltip>
        )}
      </>
    ) : defaultValue ? (
      <>{defaultValue}</>
    ) : null;
  };

  return IconCellDef;
};
export default IconWithTooltipCell;
