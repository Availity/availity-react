
export interface SelectProps {
    options?: Array<Object>;
    loadOptions?: Function;
    raw?: boolean;
}

declare const AvSelect: React.ComponentType<SelectProps>;

export default AvSelect;