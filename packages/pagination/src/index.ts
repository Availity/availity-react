import Pagination from './Pagination';
import PaginationContent from './PaginationContent';
import PaginationControls from './PaginationControls';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
Pagination.Controls = PaginationControls;
// @ts-ignore
Pagination.Content = PaginationContent;

// eslint-disable-next-line unicorn/prefer-export-from
export default Pagination;
export { default as AvResourcePagination, type AvResourcePaginationProps } from './AvResourcePagination';
export {
  default as Pagination,
  PaginationContext,
  usePagination,
  type PaginationCtx,
  type PaginationProps,
} from './Pagination';
export { default as PaginationContent, type PaginationContentProps } from './PaginationContent';
export { default as PaginationControls, type PaginationControlsProps } from './PaginationControls';
