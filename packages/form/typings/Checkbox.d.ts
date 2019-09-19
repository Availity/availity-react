import * as React from 'react';
import { InputProps } from './Input';


interface CheckboxProps extends InputProps {
    label?: React.ReactNode;
}

declare class Checkbox extends React.Component<CheckboxProps> {}

export default Checkbox;