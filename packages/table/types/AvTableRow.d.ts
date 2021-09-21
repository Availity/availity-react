import {  Row } from 'react-table';

export interface AvTableRowProps {
    row?: Row,
    index?: number;
    actionProps: object;
    cellProps: object;
}

declare const AvTableRow: React.FunctionComponent<AvTableRowProps>;

export default AvTableRow;