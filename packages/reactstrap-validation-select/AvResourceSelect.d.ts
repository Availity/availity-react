type ResourceType = {
  postGet?: Function;
  post?: Function;
  getResult?: string | Function;
};

type GraphQLConfigType = {
  type?: string;
  query?: string;
};

export interface AvResourceSelectProps {
  requestConfig?: object;
  resource: ResourceType;
  getResult?: string | Function;
  hasMore?: boolean | Function;
  delay?: number;
  debounceTimeout?: number;
  label?: React.ReactNode;
  customerId?: string;
  parameters?: object | ((params: any) => any);
  method?: 'POST';
  itemsPerPage?: number;
  onPageChange?: Function;
  isDisabled?: boolean;
  requiredParams?: any[];
  watchParams?: any[];
  cacheUniq?: any;
  additional?: object;
  graphqlConfig?: GraphQLConfigType;
  minCharsToSearch?: number;
  waitUntilFocused?: boolean;
}

declare const AvResourceSelect: React.ComponentType<AvResourceSelectProps>;

export default AvResourceSelect;
