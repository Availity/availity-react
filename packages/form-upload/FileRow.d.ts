type File = {
    name:string;
};

type FileType = {
    id: string;
    file: File;
};

type ChildrenArgument = {
  file: FileType;
  metadata?: object;
  name: string;
  remove: Function;
  ext: string;
  icon: string;
  progressBar: Function;
};

export interface FileRowProps {
    onRemove: Function;
    children?: ((arg: ChildrenArgument) => void);
    file?: File;
}

declare const FileRow: React.ComponentType<FileRowProps>;

export default FileRow;
