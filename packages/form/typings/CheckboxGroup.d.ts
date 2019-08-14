import * as React from 'react';
import { FormGroupProps } from './FormGroup';


interface CheckboxGroupProps extends FormGroupProps {
    name: string;
    label?: string;
}

declare class CheckboxGroup extends React.Component<CheckboxGroupProps> {}

export default CheckboxGroup;