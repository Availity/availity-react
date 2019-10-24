import { PaginationProps } from "reactstrap";

export interface PaginationControlsProps extends PaginationProps {
    directionLinks?: boolean;
    autoHide?: boolean;
    marginPages?: number;
    pageRange?: number;
}

declare const PaginationControls: React.FunctionComponent<PaginationControlsProps>;

export default PaginationControls;