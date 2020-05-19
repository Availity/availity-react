export type LimitType = {
    value: number;
    units: number;
};
export interface AvInput extends React.HTMLAttributes<HTMLFormElement> {
    name: string;
    validationEvent?: '' | 'onInput' | 'onChange' | 'onBlur' | 'onFocus' | Array<'onInput' | 'onChange' | 'onBlur' | 'onFocus'>;
    validate?:object;
    value?: any;
    defaultValue?: any;
    min?: string | LimitType;
    max?: string | LimitType;
    trueValue?: any;
    falseValue?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    state?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
} 