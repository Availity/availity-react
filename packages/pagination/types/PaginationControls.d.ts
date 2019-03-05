export interface PaginationControlsProps {
    directionLinks?: Boolean;
    autoHide?: Boolean;
    marginPages?: number;
    pageRange?: number;
}

declare const PaginationControls: React.FunctionComponent<PaginationControlsProps>;

export default PaginationControls;