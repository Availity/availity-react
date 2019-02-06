export interface UploadProps {
    btnText?: Node;
    bucketId: string;
    customerId: string;
    clientId: string;
    allowedFileTypes?: Array<string>;
    onFileUpload?: Function;
    onFileRemove?: Function;
    maxSize?: number;
    max?: number;
    multiple?: boolean;
    children?: Function;
    name?: string;
    showFileDrop?: boolean;
}

declare const Upload: React.ComponentType<UploadProps>;

export default Upload;