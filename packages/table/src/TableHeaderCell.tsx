import React from 'react';
import classNames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import { ExtendedTableHeader, IdType } from './types/ReactTable';
import { TableSort } from './types/TableSort';

type Props<T extends IdType> = {
  /** This is a unique id that is prepended to the element. */
  id?: string;
  /** The react-table Column that is displayed. */
  column: ExtendedTableHeader<T>;
  /** This function will be called whenever the table has been sorted. */
  onSort?: (sortBy: TableSort[]) => void;
  /** Children can be a react child. */
  children: React.ReactNode | React.ReactNode[];

  /** This property is automatically set when it is wrapped in a
   * scrollable container. This will apply fixed column widths to force
   * it to scroll rather than minify the columns to fit in a set container. */
  scrollable?: boolean;
  /** This determines whether the table is sortable or not. */
  sortable?: boolean;
  /** Correlates with whether the sorting is done outside of the table component or not. If sorting is performed outside of the component, this should be set to true. */
  manualSortBy?: boolean;
  /** When true, it will take the width as defined in the column configuration and apply it to the styles of each column.  */
  useColumnWidths?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const TableHeaderCell = <T extends IdType>({
  column,
  children,
  onSort,

  scrollable,
  sortable,
  manualSortBy,
  useColumnWidths,

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

  const getHeaderColumnProps = (column: ExtendedTableHeader<T>) => {
    const inheritProps = column.getHeaderProps();
    const props = {
      className: classNames(column.className || '', {
        sticky: column.stickyRight || column.stickyLeft,
        'sticky-right': column.stickyRight,
        'sticky-left': column.stickyLeft,
      }),
      title: undefined,
      style: useColumnWidths
        ? {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
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
