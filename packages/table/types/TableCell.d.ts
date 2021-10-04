import React from "react";
import { OnTableClickEvent } from "./Table";

export interface TableCellProps {
    cell: object;
    onCellClick: (event: OnTableClickEvent) => void;
}

declare const TableCell: React.FunctionComponent<TableCellProps>;

export default TableCell;