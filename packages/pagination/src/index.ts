import Pagination, { PaginationContext, PaginationCtx, PaginationProps, usePagination } from './Pagination';
import PaginationContent, { PaginationContentProps } from './PaginationContent';
import PaginationControls, { PaginationControlsProps } from './PaginationControls';
import AvResourcePagination, { AvResourcePaginationProps } from './AvResourcePagination';

export { AvResourcePagination, Pagination, PaginationContent, PaginationContext, PaginationControls, usePagination };

export type {
  AvResourcePaginationProps,
  PaginationContentProps,
  PaginationControlsProps,
  PaginationCtx,
  PaginationProps,
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
Pagination.Controls = PaginationControls;
// @ts-ignore
Pagination.Content = PaginationContent;

export default Pagination;
