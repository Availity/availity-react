import { AvInput } from "./AvInput";

export interface AvDateProps extends AvInput{
    hideIcon?: boolean;
}

declare const AvDate: React.ComponentType<AvDateProps>;

export default AvDate;