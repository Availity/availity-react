import { Column } from "react-table";

export interface AvTableProps {
    selectable?: boolean;
    columns: Column[],
    records: []
}

declare const AvTable: React.FunctionComponent<AvTableProps>;

export default AvTable;