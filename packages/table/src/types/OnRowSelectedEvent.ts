import { Row } from "./ReactTable";

export interface OnRowSelectedEvent<T> {
  selectedRows: Row<T>[]
}
