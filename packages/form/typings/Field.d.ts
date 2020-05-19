import * as React from 'react';
import { InputProps } from './Input';
import { FormGroupProps } from './FormGroup';


export interface FieldProps extends InputProps {
    label?: React.ReactNode;
    labelHidden?: boolean | false;
    disabled?: boolean | false;
    readOnly?: boolean | false;
    size?: string;
    inputClass?: string;
    labelClass?: string;
    helpMessage?: string | object;
    errorMessage?: string | object;
    labelAttrs?: HTMLLabelElement;
    groupAttrs?: FormGroupProps;
    grid?: object;
}

declare class Field extends React.Component<FieldProps> {}

export default Field;