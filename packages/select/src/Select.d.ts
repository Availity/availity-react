/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import type { Props as RSelectProps, GroupBase, StylesConfig, ThemeConfig } from 'react-select';
import type { AsyncPaginateProps } from 'react-select-async-paginate';
import type { FieldValidator } from 'formik';
import { ButtonProps } from 'reactstrap';

export interface SelectStyleArgs {
  showError?: boolean;
  styles?: StylesConfig;
  isInline?: boolean;
}

export declare const selectStyles: (props: SelectStyleArgs) => {
  styles: StylesConfig;
  theme: ThemeConfig;
};

export type SelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>> = {
  allowSelectAll?: boolean;
  autofill?: boolean | Record<string, string | ((value: any) => any)>;
  cacheUniq?: any | any[];
  clearButtonClassName?: string;
  clearButtonText?: string;
  creatable?: boolean;
  clearButtonProps?: ButtonProps;
  feedback?: boolean;
  helpMessage?: ReactNode;
  labelKey?: string;
  loadOptions?: AsyncPaginateProps<Option, Group, any, IsMulti>['loadOptions'];
  minLength?: number;
  maxLength?: number;
  name: string;
  onChange?: (value: Option) => void;
  raw?: boolean;
  required?: boolean;
  selectRef?: AsyncPaginateProps<Option, Group, any, IsMulti>['selectRef'];
  validate?: FieldValidator;
  waitUntilFocused?: boolean;
  valueKey?: string;
} & Omit<RSelectProps<Option, IsMulti, Group>, 'onChange'>;

declare const Select: <Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group>
) => JSX.Element;

export default Select;
