export interface AvTableHeaderProps {
    className?: string;
    sticky?: boolean;
    sortableColumns?: string[];
}

declare const AvTableHeader: React.FunctionComponent<AvTableHeaderProps>;

export default AvTableHeader;