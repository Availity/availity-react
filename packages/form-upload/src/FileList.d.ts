export interface FileListProps {
  files?: any[];
  children?: Function;
  onRemoveFile?: Function;
}

declare const FileList: (props: FileListProps) => JSX.Element | null;

export default FileList;
