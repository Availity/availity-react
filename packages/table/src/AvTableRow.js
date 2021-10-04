import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTableContext';
import AvTableCell from './AvTableCell';

const AvTableRow = ({ row, index, cellProps, actionProps, ...rest }) => {
  const {
    scrollable,
    prepareRow,
    columnSize,
    selectedRows,
    additionalContentComponent: AdditionalContentComponent,
    hasActions,
  } = useTableContext();

  const buildRowProps = (row, index) => {
    let className = '';
    if (scrollable) {
      className += 'fixed-width-tr ';
    }

    className += `av-grid-row-${index % 2 === 0 ? 'even' : 'odd'}`;
    className += _.includes(
      selectedRows.map((sr) => sr.id),
      row.id
    )
      ? ` selected`
      : '';
    return {
      className,
    };
  };

  prepareRow(row);
  const definedRowProps = buildRowProps(row, index);

  return (
    <React.Fragment key={row.id}>
      <tr {...row.getRowProps(definedRowProps)} {...rest}>
        {row.cells.map((cell, index) => (
          <React.Fragment key={index.toString()}>
            <AvTableCell cell={cell} hasStickyActions={actionProps.sticky} {...cellProps} />
          </React.Fragment>
        ))}
      </tr>
      {AdditionalContentComponent && (
        <tr {...definedRowProps} onClick={() => row.toggleRowSelected()}>
          <td colSpan={columnSize} style={{ borderTop: 0 }}>
            <AdditionalContentComponent record={row.original} />
          </td>
          {hasActions && <td className="action-column sticky" />}
        </tr>
      )}
    </React.Fragment>
  );
};

AvTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  actionProps: PropTypes.object,
  cellProps: PropTypes.object,
};

AvTableRow.defaultProps = {
  actionProps: { sticky: false },
  cellProps: {},
};

export default AvTableRow;
