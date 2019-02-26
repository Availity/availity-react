export interface PaginationContentProps {
    component: React.ReactType;
    loadingMessage?: string;
    itemKey?: string;
    loader?: boolean;
};

declare const PaginationContent: React.FunctionComponent<PaginationContentProps>;

export default PaginationContent;