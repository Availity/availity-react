export interface TableActionMenuItemProps {
  id?: string;
  action: Object;
  record: Object;
}

declare const TableActionMenuItem: React.FunctionComponent<TableActionMenuItemProps>;

export default TableActionMenuItem;
