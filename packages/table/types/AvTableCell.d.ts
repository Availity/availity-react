import React from "react";

export interface AvTableCellProps {
    cell: object;
    hasStickyActions?: boolean;
}

declare const AvTableCell: React.FunctionComponent<AvTableCellProps>;

export default AvTableCell;