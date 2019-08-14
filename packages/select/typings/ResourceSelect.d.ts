import * as React from 'react';
import { SelectFieldProps } from './SelectField';

type ResourceType = {
  postGet?: Function;
  post?: Function;
  getResult?: string | Function;
};

type GraphQLConfigType = {
  type?: string;
  query?: string;
};

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
  requiredParams?: Array<any>;
  watchParams?: Array<any>;
  cacheUniq?: any;
  additional?: object;
  graphqlConfig?: GraphQLConfigType;
  minCharsToSearch?: number;
}

declare class ResourceSelect extends React.Component<ResourceSelectProps> {
    static create(defaults: ResourceSelectProps): ResourceSelect;
}


export default ResourceSelect;
