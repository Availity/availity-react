import React from 'react';
import PropTypes from 'prop-types';
import { useTableContext } from './AvTable';
import AvTableRow from './AvTableRow';

const AvTableBody = ({ className, selectedRowClassName, ...rest }) => {
  const { getTableBodyProps, prepareRow, rows } = useTableContext();

  const buildBodyClass = () => ({
    className,
  });

  return (
    <tbody {...getTableBodyProps(buildBodyClass())} {...rest}>
      {rows.map((row) => {
        prepareRow(row);
        return <AvTableRow key={row.id} row={row} selectedRowClassName={selectedRowClassName} />;
      })}
    </tbody>
  );
};

AvTableBody.propTypes = {
  className: PropTypes.string,
  selectedRowClassName: PropTypes.string,
  children: PropTypes.node,
};

export default AvTableBody;
