import moment from 'moment';
import { AvInput } from './AvInput';

export interface AvDateRangeProps {
    start?: AvInput;
    end?: AvInput;
    onChange?: Function;
    validate?: object;
    type?: string;
    disabled?: boolean;
    max?: string | number | Date | moment.Moment;
    min?: string | number | Date | moment.Moment;
    distance?: object;
    ranges?: Array<Object> | object;
    defaultValues?: object;
    theme?: object;
}

declare const AvDateRange: React.ComponentType<AvDateRangeProps>;

export default AvDateRange;