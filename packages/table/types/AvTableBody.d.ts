import React from "react";

export interface AvTableBodyProps {
    className?: string;
    selectedRowClassName?: string;
    children?: React.ReactType
}

declare const AvTableBody: React.FunctionComponent<AvTableBodyProps>;

export default AvTableBody;