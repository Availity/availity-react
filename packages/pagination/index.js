import Pagination, { usePagination } from './Pagination';
import PaginationControls from './PaginationControls';
import PaginationContent from './PaginationContent';

export { Pagination, PaginationControls, PaginationContent, usePagination };

Pagination.Controls = PaginationControls;
Pagination.Content = PaginationContent;

export default Pagination;
