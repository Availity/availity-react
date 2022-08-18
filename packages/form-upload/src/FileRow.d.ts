type File = {
  name: string;
};

type FileType = {
  id: string;
  file: File;
};

type ChildrenArgument = {
  file: FileType;
  metadata?: object;
  name: string;
  remove: () => void;
  ext: string;
  icon: string;
  progressBar: () => JSX.Element;
};

export interface FileRowProps {
  onRemove: (id: string) => void;
  children?: (args: ChildrenArgument) => JSX.Element;
  file?: File;
}

declare const FileRow: (props: FileRowProps) => JSX.Element;

export default FileRow;
