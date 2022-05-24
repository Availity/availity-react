import type { ReactNode } from 'react';
import type { GroupBase } from 'react-select';

import type { SelectProps } from './Select';

export type SelectFieldProps<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>> = {
  feedbackClass?: string;
  groupClass?: string;
  helpId?: string;
  label?: ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  required?: boolean;
} & SelectProps<Option, IsMulti, Group>;

declare const SelectField: <Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectFieldProps<Option, IsMulti, Group>
) => JSX.Element;

export default SelectField;
