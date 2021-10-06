import React from 'react';
import { Cell } from 'react-table';
import { OnTableClickEvent } from './Table';

export interface TableCellProps {
    cell: Cell;
    children: React.ReactNode;
    onCellClick: (event: OnTableClickEvent) => void;
}

declare const TableCell: React.FunctionComponent<TableCellProps>;

export default TableCell;