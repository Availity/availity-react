export interface TableActionMenuItemProps {
  id?: string;
  action: object;
  record: object;
}

declare const TableActionMenuItem: React.FunctionComponent<TableActionMenuItemProps>;

export default TableActionMenuItem;
