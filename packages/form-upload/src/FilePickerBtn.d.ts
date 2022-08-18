export interface FilePickerBtnProps {
  onClick?: Function;
  onChange?: Function;
  multiple?: boolean;
  name?: string;
  color?: string;
  children?: React.ReactType;
  allowedFileTypes?: string[];
  maxSize?: number;
  'data-testid'?: string;
}

declare const FilePickerBtn: (props: FilePickerBtnProps) => JSX.Element;

export default FilePickerBtn;
