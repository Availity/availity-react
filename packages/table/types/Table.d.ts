import { Column, Row } from 'react-table';

type TableColumn = {
    className?: string;
    stickyRight?: boolean;
    stickyLeft?: boolean;
    disableClick?: boolean;
}

export type ExtendedTableColumn = Column & TableColumn;

export interface TableProps {
    [key:string]: any;
    id?: string;
    additionalContent?: React.ElementType | React.ReactElement | React.ReactType;
    bodyProps?: Object;
    cellProps?: Object;
    columns: ExtendedTableColumn[];
    onRowClick?: (event: OnTableClickEvent) => void;
    onRowSelected?: (event: OnRowSelectedEvent) => void;
    headerProps?: object;
    scrollable?: boolean;
    selectable?: boolean;
    sortable?: boolean;
    rowProps?: object
    records: object[];
}

export interface OnTableClickEvent extends Event {
    instance: Row,
    data: object,
    index: number
}

export interface OnRowSelectedEvent extends Event {
    selectedId: string,
    data: object
}

declare const Table: React.FunctionComponent<TableProps>;

export default Table;