import { TableRecord } from "./TableRecord";

export interface PrimaryTableAction {
    iconName: string;
    title: string;
    onClick: (record?: TableRecord) => void;
}
export interface TableAction {
    id: string;
    displayText?: string;
    divider?: boolean;
}

export interface SingleTableAction extends TableAction {
    onClick?: (record?: TableRecord) => void;
    isVisible?: (record?: TableRecord) => boolean;
}

export interface BulkTableAction extends TableAction {
    onClick?: (records?: TableRecord[]) => void;
    isVisible?: (records?: TableRecord[]) => boolean;
}
