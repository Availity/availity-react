import { Row } from "./ReactTable";
import { TableRecord } from "./TableRecord";

export interface OnTableClickEvent<T> extends React.MouseEvent<T, MouseEvent> {
    row: Row;
    data: TableRecord;
    index: number;
}
