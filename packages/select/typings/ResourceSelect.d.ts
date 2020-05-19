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

export type OptionType = Record<string, any>;

export type Additional = any;

export interface ResourceSelectProps<T> extends SelectFieldProps<T> {
  requestConfig?: object;
  resource: ResourceType;
  getResult?: string | Function;
  hasMore?: boolean | Function;
  delay?: number;
  debounceTimeout?: number;
  customerId?: string;
  parameters?: object | ((params: any) => void);
  method?: 'POST';
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
  shouldSearch?: boolean | ((inputValue: string, prevOptions: OptionType[], additional: Additional) => boolean);
}

declare class ResourceSelect<T> extends React.Component<
  ResourceSelectProps<T>
> {
  public static create<T>(defaults: ResourceSelectProps<T>): ResourceSelect<T>;
}

export default ResourceSelect;
