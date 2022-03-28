import React, { useContext } from 'react';
import { TableSortOption } from './types';

export type AvTableContext = {
  scrollable?: boolean;
  setScrollable?: React.Dispatch<React.SetStateAction<boolean>>;
  
  sortable?: boolean;
  setSortable?: React.Dispatch<React.SetStateAction<boolean>>;

  sortableColumns?: TableSortOption[];
  setSortableColumns?: React.Dispatch<React.SetStateAction<TableSortOption[]>>;

  selectable?: boolean;
  setSelectable?: React.Dispatch<React.SetStateAction<boolean>>;

  hasCustomizableColumns?: boolean;
  isCustomizingColumns?: boolean;
  setIsCustomizingColumns?: React.Dispatch<React.SetStateAction<boolean>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setInstance?: React.Dispatch<React.SetStateAction<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedRows: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>;
};

export const TableContext = React.createContext<AvTableContext>({
  scrollable: false,
  sortable: false,
  selectedRows: []
});

export const useTableContext = (): AvTableContext => useContext(TableContext);
