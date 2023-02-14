import React from 'react';
import classNames from 'classnames';
import { ExtendedTableHeader, IdType } from './types/ReactTable';
import { TableSort } from './types/TableSort';
import { UncontrolledTooltip } from 'reactstrap';

type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element **/
  id?: string;
  /**  **/
  column: ExtendedTableHeader<T>;
  /** This function will be called whenever the table has been sorted. **/
  onSort?: (sortBy: TableSort[]) => void;
  /** Children can be a react child. **/
  children: React.ReactNode | React.ReactNode[];

  /** This property is automatically set when it is wrapped in a
   * scrollable container. This will apply fixed column widths to force
   * it to scroll rather than minify the columns to fit in a set container. **/
  scrollable?: boolean;
  /** This determines whether the table is sortable or not. **/
  sortable?: boolean;
  /**  **/
  manualSortBy?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({
  column,
  children,
  onSort,

  scrollable,
  sortable,
  manualSortBy,

  ...rest
}: Props<T>): JSX.Element => {
  const sort = () => {
    column.toggleSortBy(!column.isSortedDesc, false);
    if (onSort) {
      onSort([{ id: column.id as string, desc: !column.isSortedDesc }]);
    }
  };

  const getOnClick = () => {
    if (sortable && manualSortBy && column.canSort && !column.disableSortBy) {
      return { onClick: () => sort() };
    }
    return null;
  };

  const isFixedWidth = scrollable;

  const getHeaderColumnProps = (column: ExtendedTableHeader<T>) => {
    const inheritProps = column.getHeaderProps();
    const props = {
      className: classNames(column.className || '', {
        sticky: column.stickyRight || column.stickyLeft,
        'sticky-right': column.stickyRight,
        'sticky-left': column.stickyLeft,
      }),
      title: undefined,
      style: isFixedWidth
        ? {
            width: column.width,
            minWidth: column.width,
            maxWidth: column.width,
          }
        : undefined,
      ...inheritProps,
    };
    return sortable ? { ...column.getSortByToggleProps(props) } : props;
  };

  return (
    <th {...column.getHeaderProps(getHeaderColumnProps(column))} {...getOnClick()} {...rest}>
      <span id={`${column.id}-th-title`}>{children}</span>
      {column.label ||
        (typeof column.Header === 'string' && (
          <UncontrolledTooltip placement="top" target={`${column.id}-th-title`} boundary="window">
            {column.Header?.toString()}
          </UncontrolledTooltip>
        ))}
    </th>
  );
};

export default TableHeaderCell;
