import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Table } from 'reactstrap';

const AvTable = ({ columns, records }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: records,
  });

  return (
    <>
      {columns && records && (
        <Table {...getTableProps()} hover>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('header')}
                    <span
                      className={`icon ${
                        column.isSorted ? (column.isSortedDesc ? 'icon-sort-down' : 'icon-sort-up') : 'icon-sort'
                      }`}
                    >
                      {' '}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

AvTable.propTypes = {
  selectable: PropTypes.bool,
  columns: PropTypes.oneofType({
    header: PropTypes.string,
    accessor: PropTypes.string,
  }),
  records: PropTypes.arrayOf(PropTypes.object),
};

AvTable.defaultProps = {};

export default AvTable;
