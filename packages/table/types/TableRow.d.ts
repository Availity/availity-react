import {  Row } from 'react-table';
import { OnTableClickEvent } from './Table';

export interface TableRowProps {
    row?: Row,
    index?: number;
    actionProps: object;
    cellProps: object;
    onRowClick?: (event: OnTableClickEvent) => void;
    onCellClick?: (event: OnTableClickEvent) => void;
    children: React.ElementType | React.ReactElement | React.ReactType;
}

declare const TableRow: React.FunctionComponent<TableRowProps>;

export default TableRow;