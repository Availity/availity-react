import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTableContext';

const AvTableHeader = ({ sticky, hasStickyActions, ...rest }) => {
  const { headerGroups, scrollable } = useTableContext();

  const buildHeaderClass = () => {
    let headerClass = 'av-grid-row-header';
    if (sticky) {
      headerClass += ' sticky-header';
    }
    return headerClass;
  };

  const getHeaderRowProps = () => ({
    className: scrollable ? 'fixed-width-tr' : '',
  });

  const getHeaderClass = (column) => {
    if (scrollable) {
      return 'fixed-width-text';
    }

    if (column.isIcon) {
      return 'fixed-width-icon';
    }

    if (column.id === 'selection') {
      return 'fixed-width-selection';
    }

    if (column.id === 'actions') {
      return `action-column ${hasStickyActions ? 'sticky' : ''}`;
    }
    return '';
  };

  const getHeaderColumnProps = (column) => ({
    className: getHeaderClass(column),
    title: column.label || column.Header.toString(),
  });

  return (
    <thead className={buildHeaderClass()} {...rest}>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps(getHeaderRowProps())}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps(getHeaderColumnProps(column)))}>
              {column.render('Header')}
              {column.canSort && !column.isIconColumn && (
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
  hasStickyActions: PropTypes.bool,
};

export default AvTableHeader;
