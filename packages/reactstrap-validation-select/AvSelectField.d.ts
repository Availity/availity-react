export interface AvSelectFieldProps {
    label?: Node;
    labelHidden?: boolean;
    id?: string;
    feedbackClass?: string;
    groupClass?: string;
    labelClass?: string;
    name: string;   
}

declare const AvSelectField: React.ComponentType<AvSelectFieldProps>;

export default AvSelectField;