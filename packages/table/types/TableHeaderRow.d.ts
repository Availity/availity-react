import { HeaderGroup } from 'react-table';

export interface TableHeaderRowProps {
  headerGroup: HeaderGroup;
  children: React.ReactNode;
}

declare const TableHeaderRow: React.FunctionComponent<TableHeaderRowProps>;

export default TableHeaderRow;
