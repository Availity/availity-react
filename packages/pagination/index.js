import Pagination, { usePagination, PaginationContext } from './src/Pagination';
import PaginationControls from './src/PaginationControls';
import PaginationContent from './src/PaginationContent';
import AvResourcePagination from './src/AvResourcePagination';

export {
  Pagination,
  PaginationControls,
  PaginationContent,
  usePagination,
  AvResourcePagination,
  PaginationContext,
};

Pagination.Controls = PaginationControls;
Pagination.Content = PaginationContent;

export default Pagination;
