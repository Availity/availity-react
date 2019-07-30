import dayjs from 'dayjs';
import { AvInput } from './AvInput';

export interface AvDateRangeProps {
    start?: AvInput;
    end?: AvInput;
    onChange?: Function;
    validate?: object;
    type?: string;
    disabled?: boolean;
    max?: string | number | Date | dayjs.Dayjs;
    min?: string | number | Date | dayjs.Dayjs;
    distance?: object;
    ranges?: Array<Object> | object;
    defaultValues?: object;
    theme?: object;
    hideIcon?: boolean;
}

declare const AvDateRange: React.ComponentType<AvDateRangeProps>;

export default AvDateRange;