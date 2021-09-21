import { Column } from 'react-table';
export interface AvTableProps {
    actions: Object[];
    actionProps?: Object;
    additionalContent?: React.ElementType | React.ReactElement | React.ReactType;
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