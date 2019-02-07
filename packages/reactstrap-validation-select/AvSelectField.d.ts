export interface AvSelectFieldProps {
    label?: React.ReactType;
    labelHidden?: boolean;
    id?: string;
    feedbackClass?: string;
    groupClass?: string;
    labelClass?: string;
    name: string;   
}

declare const AvSelectField: React.ComponentType<AvSelectFieldProps>;

export default AvSelectField;