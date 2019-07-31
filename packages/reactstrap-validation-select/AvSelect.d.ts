import { AvInput } from "./AvInput";

export interface AvSelectProps extends AvInput {
    options?: Array<Object>;
    loadOptions?: Function;
    raw?: boolean;
    autofill?: boolean;
}

declare const AvSelect: React.ComponentType<AvSelectProps>;

export default AvSelect;
