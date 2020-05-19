export interface FileListProps {
    files?: Array<any>;
    children?: Function;
    onRemoveFile?: Function;
}

declare const FileList: React.ComponentType<FileListProps>;

export default FileList;