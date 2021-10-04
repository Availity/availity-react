import { Column } from 'react-table';

export interface AvTableProps {
    selectable?: boolean;
    scrollable?: boolean;
    fixedWidth?: boolean;
    columns: Column[];
    records: Object[];
    children?: React.ReactNode;
    sortBy?: Object[];
}

declare const AvTable: React.FunctionComponent<AvTableProps>;

declare function useTableContext<T>(): AvTableContext<T>;

export default AvTable;
export { useTableContext };
