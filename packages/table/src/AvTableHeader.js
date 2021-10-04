import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTable';

const AvTableHeader = ({ sticky, className, sortableColumns, ...rest }) => {
  const { headerGroups, scrollable } = useTableContext();

  const buildHeaderClass = () => {
    let headerClass = 'av-table-header';
    if (sticky) {
      headerClass += ' sticky-header';
    }
    if (className) {
      headerClass += ` ${className}`;
    }
    return headerClass;
  };

  const getHeaderRowProps = () => ({
    className: scrollable ? 'fixed-width-text' : '',
  });

  const getHeaderColumnProps = (column) => ({
    className: scrollable ? 'fixed-width-text' : '',
    title: column.Header.toString(),
  });

  const isSortableColumn = (column) => _.includes(sortableColumns, column.id);

  return (
    <thead className={buildHeaderClass()} {...rest}>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps(getHeaderRowProps())}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps(getHeaderColumnProps(column)))}>
              {column.render('Header')}
              {isSortableColumn(column) && (
                <span
                  className={`icon ${
                    column.isSorted ? (column.isSortedDesc ? 'icon-sort-down' : 'icon-sort-up') : 'icon-sort'
                  }`}
                >
                  {' '}
                </span>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

AvTableHeader.propTypes = {
  sticky: PropTypes.bool,
  className: PropTypes.string,
  sortableColumns: PropTypes.arrayOf(PropTypes.string),
};

export default AvTableHeader;
