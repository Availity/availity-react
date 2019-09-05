import * as React from 'react';
import { FormGroupProps } from './FormGroup';


interface RadioGroupProps extends FormGroupProps {
    name: string;
    label?: string;
    onChange?: (value: any) => void
}

declare class RadioGroup extends React.Component<RadioGroupProps> {}

export default RadioGroup;