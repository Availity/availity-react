type File = {
    name:string;
}
type FileType = {
    id: string;
    file: File;
};
export interface FileRowProps {
    onRemove: Function;
    children?: Function;
    file?: File;
}

declare const FileRow: React.ComponentType<FileRowProps>;

export default FileRow;