import * as React from 'react';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFormElement> {
  for: string;
}

declare class FormGroup extends React.Component<FormGroupProps> {}

export default FormGroup;
