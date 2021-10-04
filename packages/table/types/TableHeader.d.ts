export interface TableHeaderProps {
    id?: string;
    sticky?: boolean;
    children: React.ElementType | React.ReactElement | React.ReactType;
}

declare const TableHeader: React.FunctionComponent<TableHeaderProps>;

export default TableHeader;