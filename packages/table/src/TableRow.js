import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { useTableContext } from './TableContext';

const TableRow = ({
  row,
  index,
  onRowClick,
  onCellClick,
  children,
  ...rest
}) => {
  const { AdditionalContent, scrollable, selectedRows, allColumns } =
    useTableContext();

  const definedRowProps = {
    className: classNames(`av-grid-row-${index % 2 === 0 ? 'even' : 'odd'}`, {
      'fixed-width-tr': scrollable,
      selected: _.includes(
        selectedRows.map((sr) => sr.id),
        row.id
      ),
      'cursor-pointer': !!onRowClick || !!onCellClick,
    }),
    onClick: (e) => {
      if (onRowClick) {
        onRowClick({
          ...e,
          data: row.original,
          index: row.index,
          instance: row,
        });
      }
    },
  };

  const definedCellProps = {
    onClick: (e) => {
      if (onCellClick) {
        onCellClick({
          ...e,
          data: row.original,
          index: row.index,
          instance: row,
        });
      }
    },
  };

  const isLastColumnSticky = allColumns.slice(-1)[0].sticky === true;
  const isFirstColumnSticky = allColumns[0].sticky === true;
  const numberOfNonStickyColumns = _.filter(
    allColumns,
    (c) => !c.sticky
  ).length;

  return (
    <>
      <tr {...row.getRowProps()} {...definedRowProps} {...rest}>
        {children}
      </tr>
      {AdditionalContent && (
        <tr {...definedRowProps}>
          {isFirstColumnSticky && <td className="sticky sticky-left" />}
          <td
            colSpan={numberOfNonStickyColumns}
            style={{ borderTop: 0 }}
            {...definedCellProps}
          >
            <AdditionalContent record={row.original} />
          </td>
          {isLastColumnSticky && <td className="sticky sticky-right" />}
        </tr>
      )}
    </>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  row: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
  onRowClick: PropTypes.func,
  onCellClick: PropTypes.func,
};

export default TableRow;
