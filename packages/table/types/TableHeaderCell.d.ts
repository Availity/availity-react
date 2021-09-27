import { Column } from 'react-table';

export interface TableHeaderCellProps {
    sticky?: boolean;
    column: Column;
}

declare const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps>;

export default TableHeaderCell;