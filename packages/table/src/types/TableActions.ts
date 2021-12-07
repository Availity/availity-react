export interface PrimaryTableAction<T> {
    iconName: string;
    title: string;
    onClick: (record?: T) => void;
}
export interface TableAction {
    id: string;
    displayText?: string;
    divider?: boolean;
}

export interface SingleTableAction<T> extends TableAction {
    onClick?: (record?: T) => void;
    isVisible?: (record?: T) => boolean;
}

export interface BulkTableAction<T> extends TableAction {
    onClick?: (records?: T[]) => void;
    isVisible?: (records?: T[]) => boolean;
}
