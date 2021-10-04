import { Column } from 'react-table';

export interface TableHeaderCellProps {
    id?: string;
    column: Column;
    children: React.ElementType | React.ReactElement | React.ReactType;
}

declare const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps>;

export default TableHeaderCell;