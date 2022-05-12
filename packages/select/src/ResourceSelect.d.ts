/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { GroupBase } from 'react-select';

import { SelectFieldProps } from './SelectField';

export type ResourceSelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  additional?: object;
  additionalPostGetArgs?: object;
  customerId?: string;
  debounceTimeout?: number;
  defaultToFirstOption?: boolean;
  defaultToOnlyOption?: boolean;
  delay?: number;
  encodeSearchValue?: boolean;
  getResult?: string | ((resource: any, data: any) => any);
  graphqlConfig?: { type: string; query: string };
  hasMore?:
    | boolean
    | ((data: any) => boolean)
    | ((data: { totalCount: number; limit: number; offset: number }) => boolean);
  itemsPerPage?: number;
  method?: 'POST';
  minCharsToSearch?: number;
  onError?: (error: unknown) => void;
  onPageChange?: (inputValue: any, page: any) => void;
  parameters?: any | ((params: any) => void);
  pageAll?: boolean;
  pageAllSearchBy?: (previousOptions: Option[], inputValue: string) => Option[] | Promise<Option[]>;
  requestConfig?: any;
  requiredParams?: any[];
  resource: any;
  searchTerm?: string;
  shouldSearch?: boolean | ((inputValue: string, prevOptions: Option[], additional: any) => boolean);
  watchParams?: any[];
} & SelectFieldProps<Option, IsMulti, Group>;

declare const ResourceSelect: (<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: ResourceSelectProps<Option, IsMulti, Group>
) => JSX.Element) & {
  create<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    defaults: ResourceSelectProps<Option, IsMulti, Group>
  ): (props: ResourceSelectProps<Option, IsMulti, Group>) => JSX.Element;
};

export default ResourceSelect;
