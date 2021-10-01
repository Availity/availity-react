type ResourceType = {
  postGet: Function;
  getResult: string | Function;
};

export interface AvResourcePaginationProps {
  itemsPerPage?: number;
  parameters?: object;
  resource: ResourceType;
  getResult: string | Function;
}

declare const AvResourcePagination: React.FC<AvResourcePaginationProps>;

export default AvResourcePagination;
