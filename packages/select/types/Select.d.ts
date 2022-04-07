/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import type { Props as RSelectProps, GroupBase } from 'react-select';
import type { AsyncPaginateProps } from 'react-select-async-paginate';
import type { FieldValidator } from 'formik';

export type SelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>> = {
  allowSelectAll?: boolean;
  autofill?: boolean | Record<string, string | ((value: any) => any)>;
  cacheUniq?: any | any[];
  creatable?: boolean;
  feedback?: boolean;
  helpMessage?: ReactNode;
  labelKey?: string;
  loadOptions?: AsyncPaginateProps<Option, Group, any, IsMulti>['loadOptions'];
  minLength?: number;
  maxLength?: number;
  name: string;
  onChange?: (value: Option) => void;
  raw?: boolean;
  selectRef?: AsyncPaginateProps<Option, Group, any, IsMulti>['selectRef'];
  validate?: FieldValidator;
  waitUntilFocused?: boolean;
  valueKey?: string;
} & Omit<RSelectProps<Option, IsMulti, Group>, 'onChange'>;

declare const Select: <Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group>
) => JSX.Element;

export default Select;
