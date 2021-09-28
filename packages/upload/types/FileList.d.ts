export interface FileListProps {
  files?: Array<any>;
  children?: Function;
  onRemoveFile?: Function;
  onPasswordSubmit?: Function;
  passwordModalZIndex?: number | string;
}

declare const FileList: React.ComponentType<FileListProps>;

export default FileList;
