export interface FileListProps {
    files?: any[];
    children?: Function;
    onRemoveFile?: Function;
}

declare const FileList: React.ComponentType<FileListProps>;

export default FileList;
