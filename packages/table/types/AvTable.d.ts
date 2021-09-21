import { Column } from 'react-table';
export interface AvTableProps {
    [key: string]: any;
    actions: Object[];
    actionProps?: Object;
    additionalContentComponent?: React.ElementType;
    bodyProps?: Object;
    columns: Column[];
    headerProps?: Object;
    scrollable?: boolean;
    selectable?: boolean;
    records: Object[];
    sortBy?: Object[];
}

declare const AvTable: React.FunctionComponent<AvTableProps>;

export default AvTable;