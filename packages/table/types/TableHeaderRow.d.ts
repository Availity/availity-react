import { HeaderGroup } from 'react-table';

export interface TableHeaderRowProps {
    headerGroup: HeaderGroup;
    children: React.ElementType | React.ReactElement | React.ReactType;
}

declare const TableHeaderRow: React.FunctionComponent<TableHeaderRowProps>;

export default TableHeaderRow;