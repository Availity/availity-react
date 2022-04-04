import React, { useState } from 'react';
import { TableSortOption } from './types/TableSortOption';
import { TableContext } from './TableContext';
import { IdType, TableInstance } from './types/ReactTable';

export type TableProviderProps = {
  children: React.ReactChild | React.ReactChild[];
};

const TableProvider = <T extends IdType>({ children }: TableProviderProps): JSX.Element => {
  const [canScroll, setScrollable] = useState(false);
  const [canSelect, setSelectable] = useState(false);
  const [canSort, setSortable] = useState(false);

  const [tableInstance, setTableInstance] = useState<TableInstance<T>>();

  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortableColumns, setSortableColumns] = useState<TableSortOption[]>([]);

  return (
    <TableContext.Provider
      value={{
        instance: tableInstance,
        setInstance: setTableInstance,

        scrollable: canScroll,
        setScrollable,

        sortable: canSort,
        setSortable,

        selectable: canSelect,
        setSelectable,

        selectedRows,
        setSelectedRows,

        sortableColumns,
        setSortableColumns,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
