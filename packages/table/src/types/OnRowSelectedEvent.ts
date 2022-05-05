import { IdType, Row } from "./ReactTable";

export interface OnRowSelectedEvent<T extends IdType> {
  selectedRows: Row<T>[]
}
