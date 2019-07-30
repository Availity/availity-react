export interface AvDateFieldProps {
    label?: React.ReactType;
    labelHidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
    inputClass?: string;
    labelClass?: string;
    helpMessage?: string | object;
    errorMessage?: string | object;
    labelAttrs?: object;
    groupAttrs?: object;
    grid?: object;
    children?: React.ReactType;
    name: string;
    size?: string | number;
}

declare const AvDateField: React.ComponentType<AvDateFieldProps>;

export default AvDateField;