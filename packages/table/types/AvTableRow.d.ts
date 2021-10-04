import {  Row } from 'react-table';

export interface AvTableRowProps {
    className?: string;
    row?: Row,
    selectedRowClassName?: string;
}

declare const AvTableRow: React.FunctionComponent<AvTableRowProps>;

export default AvTableRow;