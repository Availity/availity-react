export interface PaginationContentProps {
  [key: string]: any; // This must be done bc we spread all remaining prop onto the item components
  component: React.ReactType;
  loadingMessage?: string;
  itemKey?: string;
  loader?: boolean;
  infiniteScroll?: boolean;
  infiniteScrollProps?: object;
  containerTag?: React.ElementType | string;
}

declare const PaginationContent: React.FC<PaginationContentProps>;

export default PaginationContent;
