import { Column, Row } from 'react-table';

type TableColumn = {
  className?: string;
  stickyRight?: boolean;
  stickyLeft?: boolean;
  disableClick?: boolean;
};

export type AvTableColumn = Column & TableColumn;

export interface TableProps {
  [key: string]: any;
  id?: string;
  additionalContent?: React.ReactNode;
  bodyProps?: Object;
  cellProps?: Object;
  columns: AvTableColumn[];
  onRowClick?: (event: OnTableClickEvent) => void;
  onRowSelected?: (event: OnRowSelectedEvent) => void;
  headerProps?: object;
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  rowProps?: object;
  records: object[];
}

type TableRow = {
  toggleRowSelected: () => void;
};

export type AvTableRow = Row & TableRow;

export interface OnTableClickEvent extends Event {
  row: AvTableRow;
  data: object;
  index: number;
}

export interface OnRowSelectedEvent extends Event {
  selectedRows: string[] | number[];
}

declare const Table: React.FunctionComponent<TableProps>;

export default Table;
