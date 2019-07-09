import * as React from 'react';
import { InputProps } from './Input';


interface RadioProps extends InputProps {
    label?: string;
}

declare class Radio extends React.Component<RadioProps> {}

export default Radio;