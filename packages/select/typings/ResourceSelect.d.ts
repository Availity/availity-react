import * as React from 'react';
import { SelectFieldProps } from './SelectField';

type ResourceType = {
  postGet?: Function;
  getResult?: string | Function;
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
}

declare class ResourceSelect extends React.Component<ResourceSelectProps> {
    static create(defaults: ResourceSelectProps): ResourceSelect;
}


export default ResourceSelect;