import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useRowSelect, useSortBy } from 'react-table';
import { Util, Table } from 'reactstrap';
import AvIndeterminateCheckbox from './AvIndeterminateCheckbox';
import AvTableActionMenu from './AvTableActionMenu';
import AvTableRow from './AvTableRow';
import AvTableHeader from './AvTableHeader';
import { AvTableContext } from './AvTableContext';

const AvTable = ({
  actions,
  actionProps,
  additionalContent,
  bodyProps,
  cellProps,
  headerProps,
  columns,
  records,
  rowProps,
  scrollable,
  selectable,
  sortable,
  sortBy,
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
            label: 'Select record(s)',
            canSort: false,
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

      if (actions) {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: 'actions',
            canSort: false,
            Header: 'Actions',
            Cell: ({ row: { original } }) => (
              <>
                <AvTableActionMenu actions={actions} record={original} />
                {actionProps.primaryAction && actionProps.primaryAction.render()}
              </>
            ),
          },
        ]);
      }
    }
  );

  const renderTable = () => (
    <Table {...getTableProps({ className: 'av-grid' })} {...rest}>
      <AvTableHeader hasStickyActions={actionProps.sticky} {...headerProps} />
      <tbody {...getTableBodyProps()} {...bodyProps}>
        {rows.map((row, index) => (
          <AvTableRow
            key={row.original.id}
            row={row}
            index={index}
            cellProps={cellProps}
            actionProps={actionProps}
            {...rowProps}
          />
        ))}
      </tbody>
    </Table>
  );

  const getScrollableTable = () => <div className="av-scrollable-table-wrapper">{renderTable()}</div>;

  const hasActions = actions && actions.length > 0;

  return (
    <AvTableContext.Provider
      value={{
        headerGroups,
        rows,
        selectedRows: selectedFlatRows,
        getTableBodyProps,
        prepareRow,
        scrollable,
        additionalContent,
        columnSize: columns.length + (selectable ? 1 : 0),
        hasActions,
      }}
    >
      {scrollable ? getScrollableTable() : renderTable()}
    </AvTableContext.Provider>
  );
};

AvTable.propTypes = {
  actionProps: PropTypes.object,
  actions: PropTypes.arrayOf(PropTypes.object),
  additionalContent: Util.tagPropType,
  bodyProps: PropTypes.object,
  cellProps: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object),
  headerProps: PropTypes.object,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  scrollable: PropTypes.bool,
  records: PropTypes.arrayOf(PropTypes.object),
  rowProps: PropTypes.object,
  sortBy: PropTypes.arrayOf(PropTypes.object),
  getToggleAllRowsSelectedProps: PropTypes.func,
  row: PropTypes.object,
};

AvTable.defaultProps = {
  headerProps: {},
  rowProps: {},
  bodyProps: {},
  cellProps: {},
  actionProps: {},
};

export default AvTable;
