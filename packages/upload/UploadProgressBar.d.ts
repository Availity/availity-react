type UploadType = {
    sendPassword: Function;
    onProgress: Array<any>;
    onSuccess: Array<any>;
    onError: Array<any>;
    percentage?: number;
    errorMessage?: string;
    id: string;
    status?: string;
}

export interface UploadProgressBarProps {
    upload: UploadType;
    onProgress?: Function;
    onSuccess?: Function;
    onError?: Function;
    animated?: boolean;
    className?: string;
    tag?: React.ReactType | string;
    striped?: boolean;
    complete?: boolean;
    value?: number | string;
    max?: number | string;
    color?: string;
}



declare const UploadProgressBar: React.ComponentType<UploadProgressBarProps>;

export default UploadProgressBar;