import { AvSelectProps } from "./AvSelect";

export interface AvSelectFieldProps extends AvSelectProps {
    label?: React.ReactNode;
    labelHidden?: boolean;
    id?: string;
    feedbackClass?: string;
    groupClass?: string;
    labelClass?: string;
    name: string;   
}

declare const AvSelectField: React.ComponentType<AvSelectFieldProps>;

export default AvSelectField;
