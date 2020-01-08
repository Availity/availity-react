import * as React from 'react';
import { SelectFieldProps } from './SelectField';

interface ResourceType {
  postGet?: Function;
  post?: Function;
  getResult?: string | Function;
}

interface GraphQLConfigType {
  type?: string;
  query?: string;
}

export interface ResourceSelectProps extends SelectFieldProps {
  requestConfig?: object;
  resource: ResourceType;
  getResult?: string | Function;
  hasMore?: boolean | Function;
  delay?: number;
  debounceTimeout?: number;
  customerId?: string;
  parameters?: object;
  itemsPerPage?: number;
  onPageChange?: Function;
  requiredParams?: any[];
  watchParams?: any[];
  cacheUniq?: any;
  additional?: object;
  graphqlConfig?: GraphQLConfigType;
  minCharsToSearch?: number;
  waitUntilFocused?: boolean;
  defaultToOnlyOption?: boolean;
}

declare class ResourceSelect extends React.Component<ResourceSelectProps> {
    public static create(defaults: ResourceSelectProps): ResourceSelect;
}


export default ResourceSelect;
