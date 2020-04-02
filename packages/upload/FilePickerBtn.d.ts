export interface FilePickerBtnProps {
    onClick?: Function;
    onChange?: Function;
    multiple?: boolean;
    name?: string;
    color?: string;
    children?: React.ReactType;
    allowedFileTypes?: Array<string>;
    maxSize?: number;
    'data-testid'?:string;
    isDisabled: boolean;
}

declare const FilePickerBtn: React.ComponentType<FilePickerBtnProps>;

export default FilePickerBtn;
