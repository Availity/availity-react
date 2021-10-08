import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from './TableContext';

const TableHeaderRow = ({ headerGroup, children, ...rest }) => {
  const { scrollable } = useTableContext();

  return (
    <tr
      {...headerGroup.getHeaderGroupProps({
        className: scrollable ? 'fixed-width-tr' : '',
      })}
      {...rest}
    >
      {children}
    </tr>
  );
};

TableHeaderRow.propTypes = {
  id: PropTypes.string,
  headerGroup: PropTypes.object,
  children: PropTypes.node,
};

export default TableHeaderRow;
