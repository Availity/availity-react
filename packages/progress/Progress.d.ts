export interface ProgressProps {
    tag?: React.ReactType | string;
    animated?: boolean;
    striped?: boolean;
    complete?: boolean;
    width?: number | string;
    className?: string;
}

declare const Progress: React.FunctionComponent<ProgressProps>;

export default Progress;
