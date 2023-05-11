export interface FilePickerBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tag?: React.ElementType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  name?: string;
  allowedFileTypes?: string[];
  maxSize?: number;
  'data-testid'?: string;
}

declare const FilePickerBtn: React.ComponentType<FilePickerBtnProps>;

export default FilePickerBtn;
