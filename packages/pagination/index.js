import Pagination, { usePagination } from './Pagination';
import PaginationControls from './PaginationControls';
import PaginationContent from './PaginationContent';
import AvResourcePagination from './AvResourcePagination';

export {
  Pagination,
  PaginationControls,
  PaginationContent,
  usePagination,
  AvResourcePagination,
};

Pagination.Controls = PaginationControls;
Pagination.Content = PaginationContent;

export default Pagination;
