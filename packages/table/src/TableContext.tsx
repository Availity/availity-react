import React, { useContext } from 'react';
import { Column, TableSort, TableSortOption } from './types';
import { IdType } from './types/ReactTable';

export type AvTableContext = {
  scrollable?: boolean;
  setScrollable?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  sortable?: boolean;
  AdditionalContent?: React.ElementType;
  additionalContentProps?: Record<string, string | number | boolean | undefined | null>;
  toggleSelectAll?: () => void;
  sortBy?: TableSort;
  sortableColumns?: TableSortOption[];
  selectable?: boolean;
  hasCustomizableColumns: boolean;
  defaultColumns?: Column<IdType>[];
  onColumnsCustomized?: (hiddenColumnIds: string[], visibleColumnIds: []) => void;
  isCustomizingColumns?: boolean;
  setIsCustomizingColumns?: React.Dispatch<React.SetStateAction<boolean>>;
  minimumNumberOfColumns: number;
  onReset?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance?: any;
};

export const TableContext = React.createContext<AvTableContext>({
  scrollable: false,
  sortable: false,
  hasCustomizableColumns: false,
  isCustomizingColumns: false,
  minimumNumberOfColumns: 3
});

export const useTableContext = (): AvTableContext => useContext(TableContext);
