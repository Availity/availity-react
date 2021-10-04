import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTable, useRowSelect, useSortBy } from 'react-table';
import { Table } from 'reactstrap';
import AvIndeterminateCheckbox from './AvIndeterminateCheckbox';

export const AvTableContext = React.createContext();
export const useTableContext = () => useContext(AvTableContext);

const AvTable = ({
  selectable,
  scrollable,
  columns,
  className,
  records,
  sortBy,
  children,
  sortableColumns,
  ...rest
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
    {
      columns,
      data: records,
      initialState: {
        sortBy: sortBy || [],
      },
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      if (selectable) {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div className="text-center">
                <AvIndeterminateCheckbox aria-label="Select all records" {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="text-center">
                <AvIndeterminateCheckbox aria-label="Select record" {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  const getTableClass = () => {
    let tableClassName = 'av-grid';
    if (className) {
      tableClassName += ` ${className}`;
    }
    return {
      className: tableClassName,
    };
  };

  const renderTable = () => (
    <Table {...getTableProps(getTableClass())} {...rest}>
      {children}
    </Table>
  );

  const tableBody = scrollable ? (
    <div className="av-scrollable-table-wrapper">
      <section className="flexie content-main">
        <div className="col-scrollable-table flexie">{renderTable()}</div>
      </section>
    </div>
  ) : (
    renderTable()
  );

  return (
    <AvTableContext.Provider
      value={{
        headerGroups,
        rows,
        selectedRows: selectedFlatRows,
        getTableBodyProps,
        prepareRow,
        scrollable,
      }}
    >
      {tableBody}
    </AvTableContext.Provider>
  );
};

AvTable.propTypes = {
  selectable: PropTypes.bool,
  scrollable: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object),
  records: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  children: PropTypes.node,
  sortBy: PropTypes.arrayOf(PropTypes.object),
  sortableColumns: PropTypes.arrayOf(PropTypes.string),
  row: PropTypes.object,
  getToggleAllRowsSelectedProps: PropTypes.func,
};

AvTable.defaultProps = {};

export default AvTable;
