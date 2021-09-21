import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTableContext';

const AvTableCell = ({ cell, hasStickyActions, ...rest }) => {
  const { scrollable } = useTableContext();

  const getCellTitleAttr = () =>
    cell.value ? cell.value.toString() : undefined;
  const onCellClick = () =>
    cell.column.id !== 'selection' && cell.column.id !== 'actions'
      ? () => {
          cell.row.toggleRowSelected();
        }
      : undefined;

  const buildCellProps = () => {
    let className = '';
    if (scrollable) {
      className = 'fixed-width-text';
    }

    if (cell.column.isIconColumn) {
      className = 'fixed-width-icon';
    }

    if (cell.column.id === 'selection') {
      className = 'fixed-width-selection';
    }

    if (cell.column.id === 'actions') {
      className = `action-column ${hasStickyActions ? 'sticky' : ''}`;
    }
    return {
      className,
      title: getCellTitleAttr(cell),
      onClick: onCellClick(cell),
    };
  };

  const TableCell = ({ children, ...rest }) => <td {...rest}> {children} </td>;
  TableCell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  };

  return (
    <TableCell {...cell.getCellProps(buildCellProps())} {...rest}>
      {cell.render('Cell')}
    </TableCell>
  );
};

AvTableCell.propTypes = {
  cell: PropTypes.object,
  hasStickyActions: PropTypes.bool,
};

AvTableCell.defaultProps = {
  hasStickyActions: false,
};

export default AvTableCell;
