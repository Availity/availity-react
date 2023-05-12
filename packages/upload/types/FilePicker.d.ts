export interface FilePickerProps {
  tag?: React.ElementType;
  multiple?: boolean;
  children?: React.ReactNode;
  name?: string;
  allowedFileTypes?: string[];
  maxSize?: number | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

declare const FilePicker: React.ComponentType<FilePickerProps>;

export default FilePicker;
