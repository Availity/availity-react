import { PaginationProps } from 'reactstrap';

export interface PaginationControlsProps extends PaginationProps {
  directionLinks?: boolean;
  autoHide?: boolean;
  marginPages?: number;
  pageRange?: number;
  showPaginationText?: boolean;
  populatePaginationText?: (lower: number, upper: number, total: number) => string;
}

declare const PaginationControls: React.FC<PaginationControlsProps>;

export default PaginationControls;
