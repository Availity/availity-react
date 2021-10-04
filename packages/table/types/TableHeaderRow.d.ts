import { HeaderGroup } from 'react-table';

export interface TableHeaderRowProps {
    sticky?: boolean;
    headerGroup: HeaderGroup;
}

declare const TableHeaderRow: React.FunctionComponent<TableHeaderRowProps>;

export default TableHeaderRow;