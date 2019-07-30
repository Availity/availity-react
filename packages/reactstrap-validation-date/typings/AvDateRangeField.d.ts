export interface AvDateRangeFieldProps {
    label?: React.ReactType;
    labelHidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
    inputClass?: string;
    labelClass?: string;
    helpMessage?: string | object;
    errorMessagea?: string | object;
    // todo - make these more defined shapes
    labelAttrs?: object;
    groupAttrs?: object;
    grid?: object;
    start?: object;
    end?: object;
    size?: string | number;
    name: string;
}

declare const AvDateRangeField: React.ComponentType<AvDateRangeFieldProps>;

export default AvDateRangeField;