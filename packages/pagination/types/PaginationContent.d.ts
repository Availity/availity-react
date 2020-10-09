export interface PaginationContentProps {
    [key:string]: any; // This must be done bc we spread all remaining prop onto the item components
    component: React.ReactType;
    loadingMessage?: string;
    itemKey?: string;
    loader?: boolean;
    infiniteScroll?: boolean;
    infiniteScrollProps?: object;
    containerTag?: React.ElementType | string;
    children?: React.ReactNode | ((args: { items?: React.ReactNode }) => React.ReactNode);
}


declare const PaginationContent: React.FunctionComponent<PaginationContentProps>;

export default PaginationContent;
