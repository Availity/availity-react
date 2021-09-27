import { CellProps } from 'react-table';

declare function IconCell({ value }: CellProps<any, string>): string;
declare function BuildIcon({ name, title }: TableIconConfig): string;

export { IconCell, BuildIcon };